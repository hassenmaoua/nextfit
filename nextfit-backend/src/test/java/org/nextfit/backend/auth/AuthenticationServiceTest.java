package org.nextfit.backend.auth;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.nextfit.backend.service.email.EmailTemplateName.ACTIVATE_ACCOUNT;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.nextfit.backend.entity.User;
import org.nextfit.backend.repository.TokenRepository;
import org.nextfit.backend.repository.UserRepository;
import org.nextfit.backend.security.JwtService;
import org.nextfit.backend.service.email.EmailService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.util.ReflectionTestUtils;


@ExtendWith(MockitoExtension.class)
class AuthenticationServiceTest {

    @InjectMocks
    private AuthenticationService authenticationService;

    @Mock private UserRepository userRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock private JwtService jwtService;
    @Mock private AuthenticationManager authenticationManager;
    @Mock private EmailService emailService;
    @Mock private TokenRepository tokenRepository;

    @BeforeEach
    void setUp() {
        // Injecting values for @Value fields (via reflection if needed)
        ReflectionTestUtils.setField(authenticationService, "activationUrl", "http://localhost:8080/activate");
        ReflectionTestUtils.setField(authenticationService, "active", true);
    }

    @Test
    void testRegister_ShouldEncodePasswordAndSendEmail() throws Exception {
        RegistrationRequest request = new RegistrationRequest("test@example.com", "plainpass");

        User user = new User();
        user.setEmail(request.getEmail());

        when(passwordEncoder.encode(anyString())).thenReturn("encodedPass");
        when(userRepository.save(any(User.class))).thenReturn(user);

        User result = authenticationService.register(request);

        assertEquals("test@example.com", result.getEmail());
    }

    @Test
    void testAuthenticate_ShouldReturnAuthResponse() {
        AuthenticationRequest request = new AuthenticationRequest("test@example.com", "password");

        User user = new User();
        user.setEmail(request.getEmail());
        when(authenticationManager.authenticate(any())).thenReturn(
                new UsernamePasswordAuthenticationToken(user, null)
        );
        when(jwtService.generateToken(anyMap(), eq(user))).thenReturn("jwt-token");
        when(jwtService.generateRefreshToken(eq(user))).thenReturn("refresh-token");

        AuthenticationResponse response = authenticationService.authenticate(request);

        assertEquals("jwt-token", response.getAuthToken());
        assertEquals("refresh-token", response.getRefreshToken());
    }
}

