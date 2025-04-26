package org.nextfit.backend.dto.requests;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;
import org.nextfit.backend.enumeration.UserGender;

import java.time.LocalDate;

@Getter
@Setter
public class UpdateUserRequest {

    @Schema(description = "First name of the user", example = "John")
    @NotEmpty(message = "Firstname is mandatory")
    @NotNull(message = "Firstname is mandatory")
    private String firstName;

    @Schema(description = "Last name of the user", example = "Doe")
    @NotEmpty(message = "Lastname is mandatory")
    @NotNull(message = "Lastname is mandatory")
    private String lastName;

    @Past
    @Schema(description = "Birth Date of the user", example = "01/01/2000")
    private LocalDate birthDate;

    @Schema(description = "Phone  number of the user", example = "55000000")
    @Pattern(regexp = "^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$")
    private String phone;

    @Schema(description = "Current physical activity of the user", example = "1-2x/week")
    private String currentActivity;

    @Schema(description = "Height in CM", example = "170")
    private int height;

    @Schema(description = "Weight in KG", example = "80")
    private int weight;

    @Schema(description = "Gender of the user", example = "MALE")
    private UserGender gender;

}
