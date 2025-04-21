package org.nextfit.backend.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.nextfit.backend.enumeration.UserGender;
import org.nextfit.backend.entity.LayoutConfig;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserDTO {
    long id;
    String username;
    String email;
    String firstName;
    String lastName;
    String fullName;
    UserGender gender;
    LocalDate birthDate;
    String phone;
    List<String> roles;
    boolean enabled;
    boolean accountLocked;
    LayoutConfig config;
}
