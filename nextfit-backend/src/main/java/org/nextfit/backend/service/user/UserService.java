package org.nextfit.backend.service.user;


import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.nextfit.backend.dto.requests.CompelationRequest;
import org.nextfit.backend.entity.User;
import org.nextfit.backend.repository.UserRepository;
import org.nextfit.backend.utils.Utils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@AllArgsConstructor
public class UserService implements IUserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    @Override
    public User completeRegistration(Long userId, CompelationRequest request) {
        User user = get(userId);

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setBirthDate(request.getBirthDate());
        user.setPhone(request.getPhone());
        user.setRegistrationComplete(true);

        Utils.formatUserName(user);

        return userRepository.save(user);
    }

    @Override
    public User add(User user) {
        userRepository.findByUsername(user.getUsername()).ifPresent(u -> {
            throw new IllegalStateException("Username already exists");
        });

        userRepository.findByEmail(user.getEmail()).ifPresent(u -> {
            throw new IllegalStateException("Email already exists");
        });

        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        user.setEnabled(false);

        return userRepository.save(user);
    }


    @Override
    public User update(User user) {
        // Retrieve the current user from the database using the user's ID
        Optional<User> existingUserOptional = userRepository.findById(user.getId());
        if (existingUserOptional.isEmpty()) {
            throw new IllegalStateException("User not found");
        }
        User existingUser = existingUserOptional.get();


        // Update username if provided and different
        String newUsername = user.getUsername();
        if (newUsername != null && !newUsername.equals(existingUser.getUsername())) {
            userRepository.findByUsername(newUsername).ifPresent(u -> {
                throw new IllegalStateException("Username already exists");
            });
            existingUser.setUsername(newUsername);
        }

        // Update email if provided and different
        String newEmail = user.getEmail();
        if (newEmail != null && !newEmail.equals(existingUser.getEmail())) {
            userRepository.findByEmail(newEmail).ifPresent(u -> {
                throw new IllegalStateException("Email already exists");
            });
            existingUser.setEmail(newEmail);
        }

        // Update password if provided and different
        String newPassword = user.getPassword();
        if (newPassword != null && !newPassword.equals(existingUser.getPassword())) {
            String encodedPassword = passwordEncoder.encode(newPassword);
            existingUser.setPassword(encodedPassword);
        }

        // Generate formatted full name
        Utils.formatUserName(user);

        // Save the updated user
        return userRepository.save(user);
    }


    @Override
    public User get(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User with id '" + id + "' not found"));
    }

    @Override
    public User get(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User with email '" + email + "' not found"));
    }


    @Override
    @Transactional
    public boolean handleEnable(Long id) {
        User user = get(id);
        boolean enabled = user.isEnabled();
        user.setEnabled(!enabled);
        return enabled;
    }

    @Override
    @Transactional
    public boolean handleLock(Long id) {
        User user = get(id);
        var locked = user.isAccountLocked();
        user.setAccountLocked(!locked);
        return !locked;
    }

    @Override
    public boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public User changeEmail(String oldEmail, String newEmail) {
        if (emailExists(newEmail)) {
            throw new IllegalStateException("Email '" + newEmail + "' exists!");
        }
        var user = get(oldEmail);

        user.setEmail(newEmail);
        user.setUsername(newEmail);

        return userRepository.save(user);
    }

    @Override
    public User changePassword(Long userId, String oldPassword, String newPassword) {
        var user = get(userId);

        if (passwordEncoder.matches(oldPassword, user.getPassword())) {
            user.setPassword(passwordEncoder.encode(newPassword));
            return userRepository.save(user);
        } else {
            throw new IllegalStateException("Password is incorrect!");
        }
    }

    @Override
    public boolean userExists(String username) {
        return userRepository.existsByUsername(username) || userRepository.existsByEmail(username);
    }

    @Override
    public void disableAccount(User user) {
        user.setEnabled(false);
        userRepository.save(user);
    }


}
