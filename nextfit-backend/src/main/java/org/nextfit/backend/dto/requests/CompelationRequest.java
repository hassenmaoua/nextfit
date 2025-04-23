package org.nextfit.backend.dto.requests;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;
import org.nextfit.backend.enumeration.UserGender;

import java.time.LocalDate;

@Getter
@Setter
public class CompelationRequest {

    @Schema(description = "First name of the user", example = "John")
    @NotEmpty(message = "Firstname is mandatory")
    @NotNull(message = "Firstname is mandatory")
    private String firstName;

    @Schema(description = "Last name of the user", example = "Doe")
    @NotEmpty(message = "Lastname is mandatory")
    @NotNull(message = "Lastname is mandatory")
    private String lastName;

    @Schema(description = "Mobile phone number of the user", example = "55000000")
    private String mobile;

    @Schema(description = "Gender of the user", example = "MALE")
    private UserGender gender;


    @Pattern(regexp = "^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$")
    private String phone;

    @Past
    private LocalDate birthDate;
}
