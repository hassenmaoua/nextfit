package org.nextfit.backend.utils.mapper;

import lombok.extern.slf4j.Slf4j;
import org.nextfit.backend.auth.RegistrationRequest;
import org.nextfit.backend.dto.UserDTO;
import org.nextfit.backend.entity.User;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class UserMapper {

    public static UserDTO toUserDTO(User user) {
        if (user == null) {
            return null;
        }

        Map<String, Object> countMap = new HashMap<>();

        return UserDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .fullName(user.getFullName())
                .gender(user.getGender())
                .birthDate(user.getBirthDate())
                .phone(user.getPhone())
                .enabled(user.isEnabled())
                .accountLocked(user.isAccountLocked())
                .registrationComplete(user.isRegistrationComplete())
                .config(user.getConfig())
                .build();
    }

    // Simplified method to map UserDTO to User entity (update operation)
    public static User toUser(UserDTO userDTO, User existingUser) {

        existingUser.setFirstName(userDTO.getFirstName());
        existingUser.setLastName(userDTO.getLastName());
        existingUser.setGender(userDTO.getGender());
        existingUser.setBirthDate(userDTO.getBirthDate());
        existingUser.setPhone(userDTO.getPhone());

        return existingUser;
    }

//    public static User toUser(UpdateProfileRequest request, User existingUser) {
//        log.info("Mapping UpdateProfileRequest to User");
//
//        // Update fields in existingUser based on non-null values from request
//        if (request.getId() > 0) {
//            existingUser.setId(request.getId());
//        }
//
//        if (request.getFirstName() != null) {
//            existingUser.setFirstName(request.getFirstName());
//        }
//
//        // lastName is optional (can be null)
//        existingUser.setLastName(request.getLastName());
//
//        if (request.getGender() != null) {
//            existingUser.setGender(request.getGender());
//        }
//
//        if (request.getBirthDate() != null) {
//            existingUser.setBirthDate(request.getBirthDate());
//        }
//
//        if (request.getAddressCity() != null) {
//            existingUser.setAddressCity(request.getAddressCity());
//        }
//
//        if (request.getLang() != null) {
//            existingUser.setLang(request.getLang());
//        }
//
//        // address is optional (can be null)
//        existingUser.setAddress(request.getAddress());
//
//        if (request.getMobile() != null) {
//            existingUser.setMobile(request.getMobile());
//        }
//        // phone is optional (can be null)
//        existingUser.setPhone(request.getPhone());
//
//        existingUser.setShowEmail(request.isShowEmail());
//        existingUser.setShowMobile(request.isShowMobile());
//        existingUser.setShowPhone(request.isShowPhone());
//        existingUser.setShowBadge(request.isShowBadge());
//
//        log.info("Mapping completed successfully");
//        return existingUser;
//    }


    public static User mapRegistrationRequestToUser(RegistrationRequest request) {
        User user = new User();
        user.setUsername(request.getEmail()); // Generate username based on first name and last name
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
//        user.setFirstName(request.getFirstName());
//        user.setLastName(request.getLastName());
//        user.setFullName(request.getFirstName() + " " + request.getLastName());
//        user.setGender(request.getGender()); // Set default gender or update based on request
        user.setPhone(""); // Set phone number if available in request
        user.setAccountLocked(false); // By default, account is not locked
        user.setEnabled(false);

        return user;
    }

}
