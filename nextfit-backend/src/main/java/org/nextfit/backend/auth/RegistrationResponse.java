package org.nextfit.backend.auth;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegistrationResponse {
    private Long id;
    private String email;
    private boolean registrationComplete;
}
