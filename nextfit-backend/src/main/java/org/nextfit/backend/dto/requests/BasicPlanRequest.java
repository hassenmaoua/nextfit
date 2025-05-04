package org.nextfit.backend.dto.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.*;
import io.swagger.v3.oas.annotations.media.Schema;
import org.nextfit.backend.enumeration.UserGender;
import org.nextfit.backend.enumeration.PlanLevel;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BasicPlanRequest implements PlanRequest {
    private PlanLevel level = PlanLevel.BASIC;

    @NotEmpty(message = "Exercise types must not be empty")
    @Schema(description = "List of preferred exercise types", example = "[\"Cardio\", \"Strength\"]")
    private List<@NotBlank(message = "Exercise type must not be blank") String> exerciseTypes;

    @NotBlank(message = "Timeline in weeks is required")
    @Pattern(regexp = "\\d+", message = "Timeline must be a number in string format")
    @Schema(description = "Duration of the plan in weeks", example = "6")
    private String timelineWeeks;

    @NotBlank(message = "Primary goal is required")
    @Schema(description = "User's main fitness goal", example = "Lose weight")
    private String primaryGoal;

    @Schema(description = "Indicates if the user has access to a gym", example = "true")
    private boolean hasGymAccess;

    @Min(value = 30, message = "Target weight must be at least 30 kg")
    @Max(value = 300, message = "Target weight must be less than 300 kg")
    @Schema(description = "User's target weight in kg", example = "70")
    private int targetWeight;

    @NotBlank(message = "Exercise frequency is required")
    @Schema(description = "How often the user wants to exercise", example = "3 times/week")
    private String exerciseFrequency;

    @Schema(description = "User's motivation for working out", example = "Feel confident in my body")
    private String motivation;

    @NotBlank(message = "Age is required")
    @Pattern(regexp = "\\d+", message = "Age must be a number in string format")
    @Schema(description = "User's age in string format", example = "25")
    private String age;

    @NotNull(message = "Gender is required")
    @Schema(description = "User's gender", example = "MALE")
    private UserGender gender;

    @Min(value = 100, message = "Height must be at least 100 cm")
    @Max(value = 250, message = "Height must be less than 250 cm")
    @Schema(description = "User's height in centimeters", example = "172")
    private int height;

    @Min(value = 30, message = "Weight must be at least 30 kg")
    @Max(value = 300, message = "Weight must be less than 300 kg")
    @Schema(description = "User's current weight in kg", example = "70")
    private int weight;

    @NotBlank(message = "Current level is required")
    @Schema(description = "User's current fitness level", example = "Beginner")
    private String currentLevel;

    @Schema(
            description = "User's specific exercise preferences (types of exercises they particularly enjoy)",
            example = "Bench press, Squat"
    )
    private String exercisePreferences;

    @Schema(
            description = "Types of exercises the user dislikes or wants to avoid",
            example = "Burpees, Running"
    )
    private String exerciseDislikes;

    @Schema(
            description = "User's previous experience with fitness programs or sports",
            example = "I did yoga for 2 years but stopped 6 months ago"
    )
    private String previousExperience;

    @Schema(
            description = "Any other considerations the AI model should know about",
            example = "I have occasional lower back pain and mild asthma"
    )
    private String otherConcerns;
}
