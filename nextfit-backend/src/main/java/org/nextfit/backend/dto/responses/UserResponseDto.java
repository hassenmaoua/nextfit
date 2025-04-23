package org.nextfit.backend.dto.responses;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserResponseDto {
    private Long id;
    private String email;
    private boolean registrationComplete;
    // Other fields as needed
}