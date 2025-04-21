package org.nextfit.backend.auth;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.nextfit.backend.enumeration.UserGender;

@Getter
@Setter
@Builder
public class RegistrationRequest {


    @Schema(description = "First name of the user", example = "John")
    @NotEmpty(message = "Firstname is mandatory")
    @NotNull(message = "Firstname is mandatory")
    private String firstName;

    @Schema(description = "Last name of the user", example = "Doe")
    @NotEmpty(message = "Lastname is mandatory")
    @NotNull(message = "Lastname is mandatory")
    private String lastName;

    @Schema(description = "Email address of the user", example = "ADMIN")
//    @Email(message = "Email is not well formatted")
    @NotEmpty(message = "Email is mandatory")
    @NotNull(message = "Email is mandatory")
    private String email;

    @Schema(description = "Mobile phone number of the user", example = "55000000")
    private String mobile;

    @Schema(description = "Password for the user (minimum 8 characters)", example = "ADMIN")
    @NotEmpty(message = "Password is mandatory")
    @NotNull(message = "Password is mandatory")
//    @Size(min = 8, message = "Password should be 8 characters long minimum")
    private String password;

    @Schema(description = "Gender of the user", example = "MALE")
    private UserGender gender;

}
