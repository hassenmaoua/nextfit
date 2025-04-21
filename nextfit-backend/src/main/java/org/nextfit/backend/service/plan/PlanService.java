package org.nextfit.backend.service.plan;

import lombok.RequiredArgsConstructor;
import org.nextfit.backend.dto.requests.*;
import org.nextfit.backend.dto.responses.*;
import org.nextfit.backend.dto.*;
import org.nextfit.backend.enumeration.PlanLevel;
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
import org.springframework.web.client.RestClientException;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
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
        try {
            PromptTemplate template = getBasicPrompt(form);

            UserMessage userMessage = (UserMessage) template.createMessage();

            var outputConverter = new BeanOutputConverter(BasicPlanResponse.class);
            SystemPromptTemplate systemPrompt = new SystemPromptTemplate(basicSystemPrompt);

            SystemMessage systemMessage = (SystemMessage) systemPrompt.createMessage(Map.of("format", outputConverter.getFormat()));

            Prompt prompt = new Prompt(List.of(userMessage, systemMessage));

            ChatResponse aiResponse = chatClient.prompt(prompt).call().chatResponse();

            String textResult = "";
            if (aiResponse != null) {
                textResult = aiResponse.getResult().getOutput().getText();
            }

            return (BasicPlanResponse) outputConverter.convert(textResult);

        } catch (Exception e) {
            throw new RuntimeException("Failed to generate basic workout plan", e);
        }
    }

    private PromptTemplate getBasicPrompt(BasicPlanRequest form) {
        PromptTemplate template = new PromptTemplate(basicPrompt);

        template.add("exerciseTypes", String.join(", ", form.getExerciseTypes()));
        template.add("timelineWeeks", form.getTimelineWeeks());
        template.add("primaryGoal", form.getPrimaryGoal());
        template.add("hasGymAccess", form.isHasGymAccess() ? "do" : "do not");
        template.add("targetWeight", form.getTargetWeight() > 0 ? "my target weight is " + form.getTargetWeight() + " KG" : "");
        template.add("exerciseFrequency", form.getExerciseFrequency());
        template.add("motivation", form.getMotivation() != null ? "My motivation is " + form.getMotivation() : "");

        template.add("age", form.getAge());
        template.add("gender", form.getGender());
        template.add("height", form.getHeight());
        template.add("weight", form.getWeight());
        template.add("currentLevel", form.getCurrentLevel());

        return template;
    }

    @Override
    public MealPlanResponse generateMealPlan(MealPlanRequest form) {
        try {
            PromptTemplate template = getMealPrompt(form);

            UserMessage userMessage = (UserMessage) template.createMessage();

            var outputConverter = new BeanOutputConverter(MealPlanResponse.class);
            SystemPromptTemplate systemPrompt = new SystemPromptTemplate(mealSystemPrompt);
            SystemMessage systemMessage = (SystemMessage) systemPrompt.createMessage(Map.of("format", outputConverter.getFormat()));

            Prompt prompt = new Prompt(List.of(userMessage, systemMessage));

            ChatResponse aiResponse = chatClient.prompt(prompt).call().chatResponse();

            String textResult = "";

            if (aiResponse != null) {
                textResult = aiResponse.getResult().getOutput().getText();
            }

            return (MealPlanResponse) outputConverter.convert(textResult);

        } catch (Exception e) {
            throw new RuntimeException("Failed to generate meal plan", e);
        }
    }

    private PromptTemplate getMealPrompt(MealPlanRequest form) {
        PromptTemplate template = new PromptTemplate(mealPrompt);

        template.add("mealGoal", form.getMealGoal());
        template.add("dietType", form.getDietType());
        template.add("mealFrequency", form.getMealFrequency());
        template.add("calorieTarget", form.getCalorieTarget());
        template.add("goalWeight", form.getGoalWeight() != null ? form.getGoalWeight() : "");
        template.add("currentActivity", form.getCurrentActivity());
        template.add("bodyType", form.getBodyType());
        template.add("age", form.getAge());
        template.add("weight", form.getWeight());
        template.add("height", form.getHeight());
        template.add("gender", form.getGender() != null ? form.getGender().toString() : "");

        template.add("foodAllergies", form.getFoodAllergies() != null ? form.getFoodAllergies() : "");
        template.add("dislikedFoods", form.getDislikedFoods() != null ? form.getDislikedFoods() : "");
        template.add("preferredFoods", form.getPreferredFoods() != null ? form.getPreferredFoods() : "");
        template.add("excludedCategories", form.getExcludedCategories() != null ? form.getExcludedCategories() : "");

        template.add("breakfastTime", form.getBreakfastTime() != null ? form.getBreakfastTime() : "");
        template.add("lunchTime", form.getLunchTime() != null ? form.getLunchTime() : "");
        template.add("dinnerTime", form.getDinnerTime() != null ? form.getDinnerTime() : "");
        template.add("snackPreference", form.getSnackPreference() != null && form.getSnackPreference() ? "yes" : "no");

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

            UserMessage userMessage = new UserMessage(contextMessage.getText() + "The meal plans is a complementary support these workouts :\n" + workoutContext);



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

        // Copy metadata from meal plan (or combine from both)
        response.setLevel(PlanLevel.DUAL);
        response.setHeadline("Dual Plan: " + mealPlan.getHeadline());
        response.setSubtitle(mealPlan.getSubtitle());
        response.setPlanConcept(
                "Combined workout and nutrition plan\n" +
                        mealPlan.getPlanConcept() +
                        "\nThe workout and diet nutrition plans should have same weeks durations"
        );


        // Merge weekly schedules
        List<DualPlan> weeklyPlans = new ArrayList<>();

        // Verify both plans have matching durations
        if (basicPlan.getWeeklySchedules().size() != mealPlan.getWeeklySchedules().size()) {
            throw new IllegalStateException("Workout and meal plans have different durations");

        }


        // Combine daily entries
        for (int i = 0; i < basicPlan.getWeeklySchedules().size(); i++) {
            BasicPlan workoutDay = basicPlan.getWeeklySchedules().get(i);
            MealPlan mealDay = mealPlan.getWeeklySchedules().get(i);

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
