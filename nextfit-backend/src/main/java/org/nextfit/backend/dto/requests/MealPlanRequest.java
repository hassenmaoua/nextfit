package org.nextfit.backend.dto.requests;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.nextfit.backend.enumeration.PlanLevel;
import org.nextfit.backend.enumeration.UserGender;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class MealPlanRequest implements PlanRequest {
    private PlanLevel level = PlanLevel.MEAL;

    @Schema(description = "Meal goal, e.g., weight loss, muscle gain")
    private String mealGoal;

    @Schema(description = "Type of diet, e.g., keto, vegetarian")
    private String dietType;

    @Schema(description = "Number of meals per day")
    private int mealFrequency;

    @Schema(description = "Daily calorie target")
    private int calorieTarget;

    @Schema(description = "Goal weight in kg (optional)")
    private Double goalWeight;

    @Schema(description = "Current activity level, e.g., sedentary, active")
    private String currentActivity;

    @Schema(description = "Body type, e.g., ectomorph, endomorph")
    private String bodyType;

    @Schema(description = "User age")
    private int age;

    @Schema(description = "User weight in kg")
    private int weight;

    @Schema(description = "User height in cm")
    private int height;

    @Schema(description = "User gender: MALE or FEMALE")
    private UserGender gender;

    @Schema(description = "Comma-separated food allergies (optional)")
    private String foodAllergies;

    @Schema(description = "Comma-separated disliked foods (optional)")
    private String dislikedFoods;

    @Schema(description = "Comma-separated preferred foods (optional)")
    private String preferredFoods;

    @Schema(description = "Comma-separated excluded categories (optional)")
    private String excludedCategories;

    @Schema(description = "Preferred breakfast time (optional, e.g., 08:00)")
    private String breakfastTime;

    @Schema(description = "Preferred lunch time (optional, e.g., 13:00)")
    private String lunchTime;

    @Schema(description = "Preferred dinner time (optional, e.g., 19:00)")
    private String dinnerTime;

    @Schema(description = "Whether snacks are preferred (optional)")
    private Boolean snackPreference;
}