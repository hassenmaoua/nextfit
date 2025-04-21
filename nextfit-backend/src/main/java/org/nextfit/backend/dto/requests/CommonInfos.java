package org.nextfit.backend.dto.requests;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import org.nextfit.backend.enumeration.UserGender;

public class CommonInfos {
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
}
