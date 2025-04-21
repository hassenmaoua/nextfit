package org.nextfit.backend.auth;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.nextfit.backend.enumeration.UserRole;

@Getter
@Setter
@Builder
public class AuthenticationResponse {
    private String authToken;
    private String refreshToken;
    private UserRole role;
}
