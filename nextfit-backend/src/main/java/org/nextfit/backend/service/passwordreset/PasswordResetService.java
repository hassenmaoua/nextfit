package org.nextfit.backend.service.passwordreset;

import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.nextfit.backend.entity.Token;
import org.nextfit.backend.entity.User;
import org.nextfit.backend.enumeration.TokenType;
import org.nextfit.backend.exception.ExpiredTokenException;
import org.nextfit.backend.exception.InvalidTokenException;
import org.nextfit.backend.repository.TokenRepository;
import org.nextfit.backend.repository.UserRepository;
import org.nextfit.backend.service.email.EmailService;
import org.nextfit.backend.service.email.EmailTemplateName;
import org.nextfit.backend.utils.Utils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PasswordResetService implements IPasswordResetService {
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${application.mailing.reset-password-url}")
    private String resetUrl;


    @Override
    public void forgotPassword(String email) throws MessagingException {
        var optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isPresent()) {
            sendResetPasswordEmail(optionalUser.get());
        }
    }

    @Override
    @Transactional
    public void updatePassword(String password, String token) throws MessagingException {
        LocalDateTime tokenExpiresAt;
        LocalDateTime now = LocalDateTime.now();

        Token savedToken = tokenRepository.findByValue(token)
                .orElseThrow(() -> new InvalidTokenException("Invalid token"));

        if (!savedToken.getType().equals(TokenType.RESET_PASSWORD)) {
            throw new InvalidTokenException("Invalid token type");
        }

        tokenExpiresAt = savedToken.getExpiresAt();

        if (savedToken.getValidatedAt() == null) {
            if (tokenExpiresAt.isBefore(now)) {
                sendResetPasswordEmail(savedToken.getUser());
                throw new ExpiredTokenException("Reset token has expired. A new token has been send to the same email address");
            }

            var user = userRepository.findById(savedToken.getUser().getId())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            user.setPassword(passwordEncoder.encode(password));
            userRepository.save(user);

            savedToken.setValidatedAt(LocalDateTime.now());
            tokenRepository.save(savedToken);
        } else {
            throw new InvalidTokenException("Token Already Used");
        }
    }

    private void sendResetPasswordEmail(User user) throws MessagingException {
        var newToken = generateAndSaveResetToken(user);

        emailService.sendEmail(
                user.getEmail(),
                "",
                EmailTemplateName.RESET_PASSWORD,
                resetUrl + "?token=" + newToken,
                newToken,
                "Reset Password"
        );
    }

    private String generateAndSaveResetToken(User user) {
        String generatedToken = Utils.generateTokenCode(20, TokenType.RESET_PASSWORD);
        var token = Token.builder()
                .value(generatedToken)
                .type(TokenType.RESET_PASSWORD)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusMinutes(15))
                .user(user)
                .build();

        tokenRepository.save(token);

        return generatedToken;
    }
}
