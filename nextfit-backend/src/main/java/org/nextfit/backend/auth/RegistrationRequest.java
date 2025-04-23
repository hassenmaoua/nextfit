package org.nextfit.backend.auth;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class RegistrationRequest {
    @Schema(description = "Email address of the user", example = "ADMIN")
//    @Email(message = "Email is not well formatted")
    @NotEmpty(message = "Email is mandatory")
    @NotNull(message = "Email is mandatory")
    private String email;

    @Schema(description = "Password for the user (minimum 8 characters)", example = "ADMIN")
    @NotEmpty(message = "Password is mandatory")
    @NotNull(message = "Password is mandatory")
//    @Size(min = 8, message = "Password should be 8 characters long minimum")
    private String password;

}
