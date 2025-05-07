package org.nextfit.backend.service.plan;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.nextfit.backend.dto.requests.*;
import org.nextfit.backend.dto.responses.*;
import org.nextfit.backend.dto.*;
import org.nextfit.backend.enumeration.PlanLevel;
import org.nextfit.backend.exception.InvalidInputException;
import org.nextfit.backend.exception.PlanGenerationException;
import org.nextfit.backend.model.BasicPlan;
import org.nextfit.backend.model.DualPlan;
import org.nextfit.backend.model.MealPlan;
import org.nextfit.backend.model.Plan;
import org.nextfit.backend.security.AccessService;
import org.nextfit.backend.utils.JsonUtils;
import org.springframework.ai.chat.messages.SystemMessage;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.ai.chat.prompt.SystemPromptTemplate;
import org.springframework.ai.converter.BeanOutputConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.transaction.annotation.Transactional;
import org.nextfit.backend.entity.PlanEntity;
import org.nextfit.backend.repository.PlanRepository;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestClientException;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class PlanService implements IPlanService {
    private final ChatClient chatClient;
    private final PlanRepository planRepository;
    private final AccessService accessService;


    @Value("classpath:/prompts/basic-prompt.st")
    private Resource basicPrompt;

    @Value("classpath:/prompts/meal-prompt.st")
    private Resource mealPrompt;

    @Value("classpath:/prompts/basic-system-prompt.st")
    private Resource basicSystemPrompt;

    @Value("classpath:/prompts/meal-system-prompt.st")
    private Resource mealSystemPrompt;


    public PlanEntity createPlan(Plan<?> plan, PlanRequest request) {
        PlanEntity planEntity = new PlanEntity();

        planEntity.setName(plan.getHeadline());
        planEntity.setLevel(plan.getLevel());
        planEntity.setContent(JsonUtils.toJson(plan));
        planEntity.setInput(JsonUtils.toJson(request));
        planEntity.setUser(accessService.getCurrentUser());

        return planRepository.save(planEntity);
    }

    @Transactional(readOnly = true)
    public Plan<?> getPlanById(Long id) {
        PlanEntity plan = planRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Plan not found with id: " + id));
        return JsonUtils.toPlan(plan.getContent());
    }

    @Transactional(readOnly = true)
    public List<PlanDTO> getAllPlansByUserId(Long userId) {
        var plans = planRepository.findByUserIdOrderByUpdatedAtDesc(userId);
        return plans.stream().map((planEntity -> new PlanDTO(planEntity.getId(), planEntity.getName()))).collect(Collectors.toList());
    }

    @Transactional
    public PlanEntity updatePlan(Long planId, String content) {
        PlanEntity plan = planRepository.findById(planId)
                .orElseThrow(() -> new RuntimeException("Plan not found with id: " + planId));
        plan.setContent(content);
        return planRepository.save(plan);
    }

    @Transactional
    public void deletePlan(Long planId) {
        planRepository.deleteById(planId);
    }

    @Override
    public BasicPlanResponse generateBasicPlan(BasicPlanRequest form) {
        log.debug("Starting BASIC plan generation");
        try {
            // 1. Create prompts
            PromptTemplate template = getBasicPrompt(form);
            UserMessage userMessage = (UserMessage) template.createMessage();
            log.debug("Created BASIC plan user message : {}", userMessage);

            var outputConverter = new BeanOutputConverter<>(BasicPlanResponse.class);
            SystemMessage systemMessage = (SystemMessage) new SystemPromptTemplate(basicSystemPrompt)
                    .createMessage(Map.of("format", outputConverter.getFormat()));
            log.debug("BASIC plan system message prepared : {}", systemMessage);

            // 2. Execute AI call
            Prompt prompt = new Prompt(List.of(userMessage, systemMessage));

            ChatResponse aiResponse = chatClient.prompt(prompt)
                    .call()
                    .chatResponse();

            // 3. Handle response scenarios
            if (aiResponse == null || aiResponse.getResult() == null) {
                log.error("Received null response from AI service");
                throw new RuntimeException("No response received from AI service");
            }

            String textResult = aiResponse.getResult().getOutput().getText();
            log.debug("Raw AI response text for BASIC plan: {}", textResult);

            // 4. Check for validation errors from system message
            if (textResult.contains("Invalid input detected")) {
                log.warn("Detected validation errors in AI response");

                Pattern pattern = Pattern.compile("Invalid input detected in \\[(.*?)]: (.*?)\\. This field should");
                Matcher matcher = pattern.matcher(textResult);

                Map<String, String> errors = new HashMap<>();
                while (matcher.find()) {
                    errors.put(matcher.group(1), matcher.group(2));
                }

                throw new InvalidInputException("Invalid input fields detected", errors);
            }

            // 5. Convert successful response
            try {
                BasicPlanResponse response = outputConverter.convert(textResult);
                if (response != null) {
                    response.setLevel(PlanLevel.BASIC);
                }
                log.debug("Successfully converted to BasicPlanResponse : {}", response);
                return response;
            } catch (Exception conversionError) {
                log.error("Failed to convert to BasicPlanResponse. Raw text: {}", textResult, conversionError);
                throw new RuntimeException("The generated plan format was invalid", conversionError);
            }

        } catch (Exception e) {
            log.error("Plan generation failed for request: {}", form, e);
            throw new PlanGenerationException("Failed to generate workout plan. Please try again later.");
        } finally {
            log.debug("Completed BASIC plan generation attempt");
        }
    }

    private PromptTemplate getBasicPrompt(BasicPlanRequest form) {
        PromptTemplate template = new PromptTemplate(basicPrompt);

        // Required preferences
        template.add("exerciseTypes", String.join(", ", form.getExerciseTypes()));
        template.add("timelineWeeks", form.getTimelineWeeks());
        template.add("primaryGoal", form.getPrimaryGoal());
        template.add("hasGymAccess", form.isHasGymAccess() ? "do" : "do not");
        template.add("exerciseFrequency", form.getExerciseFrequency());

        // Profile information
        template.add("age", form.getAge());
        template.add("gender", form.getGender());
        template.add("height", form.getHeight());
        template.add("weight", form.getWeight());
        template.add("currentLevel", form.getCurrentLevel());

        // Optional fields with null checks
        template.add("targetWeight",
                form.getTargetWeight() > 0 ? "My target weight is " + form.getTargetWeight() + " KG, " : "");

        template.add("motivation",
                StringUtils.hasText(form.getMotivation()) ?
                        "My motivation is " + form.getMotivation() :
                        "");

        template.add("exercisePreferences",
                StringUtils.hasText(form.getExercisePreferences()) ?
                        "I prefer to include these exercises among the workout's exercises : " + form.getExercisePreferences() + ". " :
                        "");

        template.add("exerciseDislikes",
                StringUtils.hasText(form.getExerciseDislikes()) ?
                        "I dislike these exercises, do not include them : " + form.getExerciseDislikes() + ". " :
                        "");

        template.add("previousExperience",
                StringUtils.hasText(form.getPreviousExperience()) ?
                        "I had previous Fitness Experience : " + form.getPreviousExperience() + ", " :
                        "");

        template.add("otherConcerns",
                StringUtils.hasText(form.getOtherConcerns()) ?
                        "I have these considerations : " + form.getOtherConcerns() + "." :
                        "");

        return template;
    }

    @Override
    public MealPlanResponse generateMealPlan(MealPlanRequest form) {
        log.debug("Starting MEAL plan generation");
        try {
            // 1. Create prompts
            PromptTemplate template = getMealPrompt(form);
            UserMessage userMessage = (UserMessage) template.createMessage();
            log.debug("Created MEAL plan user message : {}", userMessage);

            var outputConverter = new BeanOutputConverter<>(MealPlanResponse.class);
            SystemMessage systemMessage = (SystemMessage) new SystemPromptTemplate(mealSystemPrompt)
                    .createMessage(Map.of("format", outputConverter.getFormat()));
            log.debug("MEAL plan system message prepared : {}", outputConverter.getFormat());

            // 2. Execute AI call
            Prompt prompt = new Prompt(List.of(userMessage, systemMessage));

            ChatResponse aiResponse = chatClient.prompt(prompt)
                    .call()
                    .chatResponse();

            // 3. Handle response scenarios
            if (aiResponse == null || aiResponse.getResult() == null) {
                log.error("Received null response from AI service");
                throw new RuntimeException("No response received from AI service");
            }

            String textResult = aiResponse.getResult().getOutput().getText();
            log.debug("Raw AI response text for MEAL plan: {}", textResult);

            // 4. Check for validation errors from system message
//            if (textResult.contains("Invalid input detected")) {
//                log.warn("Detected validation errors in AI response");
//
//                Pattern pattern = Pattern.compile("Invalid input detected in \\[(.*?)]: (.*?)\\. This field should");
//                Matcher matcher = pattern.matcher(textResult);
//
//                Map<String, String> errors = new HashMap<>();
//                while (matcher.find()) {
//                    errors.put(matcher.group(1), matcher.group(2));
//                }
//
//                throw new InvalidInputException("Invalid input fields detected", errors);
//            }

            // 5. Convert successful response
            try {
                MealPlanResponse response = outputConverter.convert(textResult);
                if (response != null) {
                    response.setLevel(PlanLevel.MEAL);
                }
                log.debug("Successfully converted to MealPlanResponse : {}", response);
                return response;
            } catch (Exception conversionError) {
                log.error("Failed to convert to MealPlanResponse. Raw text: {}", textResult, conversionError);
                throw new RuntimeException("The generated plan format was invalid", conversionError);
            }

        } catch (Exception e) {
            log.error("Plan generation failed for request: {}", form, e);
            throw new PlanGenerationException("Failed to generate workout plan. Please try again later.");
        } finally {
            log.debug("Completed MEAL plan generation attempt");
        }
    }

    private PromptTemplate getMealPrompt(MealPlanRequest form) {
        PromptTemplate template = new PromptTemplate(mealPrompt);

        template.add("mealGoal", form.getMealGoal());
        template.add("dietType", form.getDietType());
        template.add("mealFrequency", form.getMealFrequency());
        template.add("calorieTarget", form.getCalorieTarget());
        template.add("goalWeight", form.getTargetWeight() != null ? form.getTargetWeight() : "");
        template.add("currentActivity", form.getCurrentActivity());
        template.add("bodyType", form.getBodyType());
        template.add("age", form.getAge());
        template.add("weight", form.getWeight());
        template.add("height", form.getHeight());
        template.add("gender", form.getGender() != null ? form.getGender().toString() : "");

        template.add("foodAllergies", form.getFoodAllergies() != null ? form.getFoodAllergies() : "");
        template.add("preferredFoods", form.getPreferredFoods() != null ? form.getPreferredFoods() : "");

        return template;
    }


    @Override
    public DualPlanResponse generateDualPlan(DualPlanRequest form) {
        try {
            // 1. Generate Basic Plan
            BasicPlanResponse basicPlanResponse = generateBasicPlan(form.getBasicPlan());

            // 2. Generate Meal Plan with context from Basic Plan
            String workoutContext = JsonUtils.toJson(basicPlanResponse);
            PromptTemplate mealPrompt = getMealPrompt(form.getMealPlan());

            // Improved prompt with workout context
            UserMessage contextMessage = (UserMessage) mealPrompt.createMessage();

            UserMessage userMessage = new UserMessage(contextMessage.getText() + "The meal plans is a complementary support these workouts :\n" + workoutContext +
                    "\nThe plan should have equal weeklySchedules size to workouts");


            // 3. Prepare AI prompt with output formatting
            var outputConverter = new BeanOutputConverter<>(MealPlanResponse.class);
            SystemPromptTemplate systemPrompt = new SystemPromptTemplate(mealSystemPrompt);
            SystemMessage systemMessage = (SystemMessage) systemPrompt.createMessage(
                    Map.of("format", outputConverter.getFormat())
            );

            // 4. Execute AI call
            ChatResponse aiResponse;
            try {
                aiResponse = chatClient.prompt(new Prompt(List.of(userMessage, systemMessage))).call().chatResponse();
            } catch (RestClientException e) {
                if (e.getMessage().contains("finish_reason")) {
                    throw new RuntimeException("OpenAI API returned an error status. Please check your request parameters.", e);
                }
                throw e;
            }

            if (aiResponse == null) {
                throw new RuntimeException("AI response was empty");
            }

            // 5. Parse and combine results
            MealPlanResponse mealPlanResponse = outputConverter.convert(
                    aiResponse.getResult().getOutput().getText()
            );

            if (mealPlanResponse == null) {
                throw new RuntimeException("Failed to convert AI response to MealPlanResponse");
            }

            return createDualPlanResponse(basicPlanResponse, mealPlanResponse);

        } catch (Exception e) {
            throw new RuntimeException("Failed to generate dual plan: " + e.getMessage(), e);
        }
    }

    private DualPlanResponse createDualPlanResponse(
            BasicPlanResponse basicPlan,
            MealPlanResponse mealPlan
    ) {
        DualPlanResponse response = new DualPlanResponse();


        response.setLevel(PlanLevel.DUAL);
        response.setHeadline("Dual Plan: " + mealPlan.getHeadline());
        response.setSubtitle(mealPlan.getSubtitle());
        response.setPlanConcept(
                "Combined workout and nutrition plan\n" + mealPlan.getPlanConcept()
        );

        List<DualPlan> weeklyPlans = new ArrayList<>();

        List<BasicPlan> workoutSchedules = basicPlan.getWeeklySchedules();
        List<MealPlan> mealSchedules = mealPlan.getWeeklySchedules();

        int maxSize = Math.max(workoutSchedules.size(), mealSchedules.size());

        for (int i = 0; i < maxSize; i++) {
            BasicPlan workoutDay = i < workoutSchedules.size() ? workoutSchedules.get(i) : createEmptyBasicPlan();
            MealPlan mealDay = i < mealSchedules.size() ? mealSchedules.get(i) : createEmptyMealPlan();

            DualPlan dualDay = new DualPlan();
            dualDay.setHeadline(workoutDay.getHeadline());
            dualDay.setSubtitle(workoutDay.getSubtitle());
            dualDay.setWorkouts(workoutDay.getWorkouts());
            dualDay.setDiets(mealDay.getDiets());

            weeklyPlans.add(dualDay);
        }

        response.setWeeklySchedules(weeklyPlans);
        return response;
    }

    // Helpers to create empty plans
    private BasicPlan createEmptyBasicPlan() {
        BasicPlan empty = new BasicPlan();
        empty.setHeadline("No workout");
        empty.setSubtitle("");
        empty.setWorkouts(Collections.emptyList());
        return empty;
    }

    private MealPlan createEmptyMealPlan() {
        MealPlan empty = new MealPlan();
        empty.setHeadline("No meal plan");
        empty.setSubtitle("");
        empty.setDiets(Collections.emptyList());
        return empty;
    }


    @Override
    public NutritionPlanResponse generateNutritionPlan(NutritionPlanRequest form) {
        // TODO: generateNutritionPlan
        return null;
    }

    @Override
    public PremiumPlanResponse generatePremiumPlan(PremiumPlanRequest form) {
        // TODO: generatePremiumPlan
        return null;
    }


//    private String generateMedicalConditions(FormDTO form) {
//        StringBuilder profile = new StringBuilder();
//
//        profile.append("I ")
//                .append(form.isSmokes() ? "smoke" : "don’t smoke")
//                .append(", and I ")
//                .append(form.getAlcoholConsumption().equals("none") ? "don’t drink alcohol"
//                        : form.getAlcoholConsumption().equals("occasional") ? "drink occasionally"
//                        : "drink frequently")
//                .append(". ");
//
//        if (form.getHasMedicalConditions()) {
//            profile.append("I have some medical conditions: ").append(form.getMedicalDetails()).append(". ");
//        } else {
//            profile.append("I don’t have any known medical conditions. ");
//        }
//
//        if (form.getInjuries() != null && !form.getInjuries().isEmpty()) {
//            profile.append("I've had the following injuries: ").append(form.getInjuries()).append(". ");
//        }
//
//        if (form.getMedications() != null && !form.getMedications().isEmpty()) {
//            profile.append("I’m currently taking: ").append(String.join(", ", form.getMedications())).append(". ");
//        }
//
//        if (form.getAllergies() != null && !form.getAllergies().isEmpty()) {
//            profile.append("I’m allergic to: ").append(String.join(", ", form.getAllergies())).append(". ");
//        }
//
//        return profile.toString();
//    }
}
