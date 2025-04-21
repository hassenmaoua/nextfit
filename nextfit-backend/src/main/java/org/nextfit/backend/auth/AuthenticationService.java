package org.nextfit.backend.auth;


import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.nextfit.backend.enumeration.TokenType;
import org.nextfit.backend.enumeration.UserRole;
import org.nextfit.backend.entity.Token;
import org.nextfit.backend.entity.User;
import org.nextfit.backend.exception.ExpiredTokenException;
import org.nextfit.backend.exception.InvalidTokenException;
import org.nextfit.backend.repository.TokenRepository;
import org.nextfit.backend.repository.UserRepository;
import org.nextfit.backend.security.JwtService;
import org.nextfit.backend.utils.Utils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
//    private final EmailService emailService;
    private final TokenRepository tokenRepository;

//    @Value("${application.mailing.activation-url}")
//    private String activationUrl;

//    @Value("${application.default-active}")
//    private static boolean ACTIVE;

//    public void register(RegistrationRequest request) throws MessagingException {
//        var userRole = roleRepository.findByName("USER")
//                .orElseThrow(() -> new IllegalStateException("ROLE USER was not initiated"));
//
//        var user = UserMapper.mapRegistrationRequestToUser(request);
//
//        user.setPassword(passwordEncoder.encode(request.getPassword()));
//        user.setRoles(Collections.singletonList(userRole));
//        user.setBadge(UserBadge.NEW_MEMBER);
//        user.setEnabled(ACTIVE);
//
//        Utils.formatUserName(user);
//
//        userRepository.save(user);
//        sendValidationEmail(user);
//    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var claims = new HashMap<String, Object>();
        var user = ((org.nextfit.backend.entity.User) auth.getPrincipal());
        claims.put("fullName", user.getFullName());

        var authToken = jwtService.generateToken(claims, user);
        var refreshToken = jwtService.generateRefreshToken(user);

        var authorities = user.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();
        UserRole role = authorities.contains("ADMIN") ? UserRole.ADMIN : UserRole.USER;

        return AuthenticationResponse.builder()
                .authToken(authToken)
                .refreshToken(refreshToken)
                .role(role)
                .build();
    }

    @Transactional
    public void activateAccount(String token) throws MessagingException {
        LocalDateTime tokenExpiresAt;
        LocalDateTime now = LocalDateTime.now();

        Token savedToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new InvalidTokenException("Invalid token"));

        if (!savedToken.getType().equals(TokenType.ACTIVATE_ACCOUNT)) {
            throw new InvalidTokenException("Invalid token type");
        }

        tokenExpiresAt = savedToken.getExpiresAt();

        if (savedToken.getValidatedAt() == null) {
            if (tokenExpiresAt.isBefore(now)) {
//                sendValidationEmail(savedToken.getUser());
                throw new ExpiredTokenException("Activation token has expired. A new token has been send to the same email address");
            }

            var user = userRepository.findById(savedToken.getUser().getId())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            user.setEnabled(true);
            userRepository.save(user);

            savedToken.setValidatedAt(LocalDateTime.now());
            tokenRepository.save(savedToken);
        } else {
            throw new InvalidTokenException("Token Already Used");
        }
    }

//    private void sendValidationEmail(User user) throws MessagingException {
//        var newToken = generateAndSaveActivationToken(user);
//
//        emailService.sendEmail(
//                user.getEmail(),
//                user.getFullName(),
//                EmailTemplateName.ACTIVATE_ACCOUNT,
//                activationUrl,
//                newToken,
//                "Account activation"
//        );
//    }

    private String generateAndSaveActivationToken(org.nextfit.backend.entity.User user) {
        // Generate a token
        String generatedToken = Utils.generateTokenCode(6, TokenType.ACTIVATE_ACCOUNT);
        var token = Token.builder()
                .token(generatedToken)
                .type(TokenType.ACTIVATE_ACCOUNT)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusMinutes(30))
                .user(user)
                .build();
        tokenRepository.save(token);

        return generatedToken;
    }

    public User getUserByToken(String jwt) {
        // Extract the user email from the token
        String userEmail = jwtService.extractUsername(jwt);

        // Retrieve the user from the repository using the email
        User user = userRepository.findByUsername(userEmail).orElse(null);

        // Return null if the user doesn't exist or the token is not valid for the user
        if (user == null || !jwtService.isTokenValid(jwt, user)) {
            return null;
        }

        return user;

    }
}
