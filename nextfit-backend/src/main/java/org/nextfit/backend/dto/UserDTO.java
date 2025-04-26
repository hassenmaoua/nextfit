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
    int age;
    String phone;
    String currentActivity;
    int weight;
    int height;
    List<String> roles;
    boolean enabled;
    boolean accountLocked;
    boolean registrationComplete;
    LayoutConfig config;
}
