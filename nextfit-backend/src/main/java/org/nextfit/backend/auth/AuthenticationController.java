package org.nextfit.backend.auth;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.nextfit.backend.dto.UserDTO;
import org.nextfit.backend.entity.User;
import org.nextfit.backend.handler.ExceptionResponse;
import org.nextfit.backend.security.JwtService;
import org.nextfit.backend.service.user.UserService;
import org.nextfit.backend.utils.mapper.UserMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.nextfit.backend.handler.BusinessErrorCodes.BAD_CREDENTIALS;

@RestController
@RequestMapping("auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Web Services for authentication")
public class AuthenticationController {
    private final AuthenticationService service;
    private final UserService userService;
    private final JwtService jwtService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseEntity<?> register(@RequestBody @Valid RegistrationRequest request) throws MessagingException, BadRequestException {
        if (userService.userExists(request.getEmail())) {
            var res = ExceptionResponse.builder()
                    .businessErrorCode(BAD_CREDENTIALS.getCode())
                    .businessErrorDescription(BAD_CREDENTIALS.getDescription())
                    .message("Email is already taken")
                    .build();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
        }

        var user = service.register(request);
        var registrationResponse = new RegistrationResponse(user.getId(), user.getEmail(), user.isRegistrationComplete());

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(registrationResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticate(request));
    }
    @GetMapping("/activate-account")
    public ResponseEntity<?> confirm(
            @RequestParam String token
    ) throws MessagingException {
        service.activateAccount(token);

        return ResponseEntity.noContent().build();
    }


    @PostMapping("/verify_token")
    public ResponseEntity<UserDTO> getUserByToken(@RequestParam String token) {
        User user = service.getUserByToken(token);
        UserDTO userDTO = UserMapper.toUserDTO(user);

        // Return the response received from the external API
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(userDTO);
    }

}
