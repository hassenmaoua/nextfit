package org.nextfit.backend.handler;

import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.*;

@Getter
public enum BusinessErrorCodes {
    NO_CODE(0, NOT_IMPLEMENTED, "No code"),
    INCORRECT_CURRENT_PASSWORD(300, BAD_REQUEST, "Current password is incorrect"),
    NEW_PASSWORD_DOES_NOT_MATCH(301, BAD_REQUEST, "The new password does not match"),
    ACCOUNT_LOCKED(302, FORBIDDEN, "User account is locked"),
    ACCOUNT_DISABLED(303, FORBIDDEN, "User account is disabled"),
    BAD_CREDENTIALS(304, FORBIDDEN, "Login and / or Password is incorrect"),
    INVALID_TOKEN(404, NOT_FOUND, "Invalid Token"),
    EXPIRED_TOKEN(406, NOT_ACCEPTABLE, "Token Expired" ),
    VALIDATION_ERROR(400, BAD_REQUEST, "Request validation failed"),
    AI_SERVICE_UNAVAILABLE(503, SERVICE_UNAVAILABLE, "AI plan generation service unavailable"),
    DATA_STORAGE_FAILURE(500, INTERNAL_SERVER_ERROR, "Data storage operation failed"),
    PROCESSING_TIMEOUT(504, GATEWAY_TIMEOUT, "Processing timeout occurred"),
    GENERIC_ERROR(500, INTERNAL_SERVER_ERROR, "Unexpected error occurred")
    ;

    private final int code;
    private final String description;
    private final HttpStatus httpStatus;

    BusinessErrorCodes(int code, HttpStatus status, String description) {
        this.code = code;
        this.description = description;
        this.httpStatus = status;
    }
}
