package org.nextfit.backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.nextfit.backend.dto.UserDTO;
import org.nextfit.backend.security.AccessService;
import org.nextfit.backend.service.user.UserService;
import org.nextfit.backend.utils.mapper.UserMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@Tag(name = "User Management", description = "Web Services for User management")
@RestController
@AllArgsConstructor
@RequestMapping("/user")
public class UserController {
    private final UserService userService;
    private final AccessService accessService;



    @Operation(
            operationId = "load-user",
            summary = "Get user by ID",
            description = "Retrieve a user by ID.")
    @GetMapping("/load/{id}")
    public ResponseEntity<UserDTO> getById(@PathVariable("id") Long userId) {
        var user = userService.get(userId);
        UserDTO userDTO = UserMapper.toUserDTO(user);
        return ResponseEntity.status(HttpStatus.OK).body(userDTO);
    }


    @Operation(
            operationId = "updatePassword",
            summary = "Update password",
            description = "Change user password.")
    @PutMapping("/change-password")
    public ResponseEntity<UserDTO> updatePassword(@RequestParam Long userId, @RequestParam String oldPassword, @RequestParam String newPassword) {
        var user = userService.changePassword(userId, oldPassword, newPassword);
        return ResponseEntity.ok(UserMapper.toUserDTO(user));
    }

    @Operation(
            operationId = "userExists",
            summary = "User exists",
            description = "User exists by email or not.")
    @GetMapping("/email-exists")
    public ResponseEntity<Boolean> userExists(@RequestParam String email) {
        return ResponseEntity.ok(userService.userExists(email));
    }

    @Operation(
            operationId = "disableAccount",
            summary = "Disable Account",
            description = "User self disable account.")
    @DeleteMapping("/disable")
    public ResponseEntity<?> disableAccount() {
        var user = accessService.getCurrentUser();

        userService.disableAccount(user);
        return ResponseEntity.noContent().build();
    }
}
