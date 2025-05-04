package org.nextfit.backend.exception;

import lombok.Getter;

import java.time.Instant;

/**
 * Thrown when plan generation fails due to system issues
 */
@Getter
public class PlanGenerationException extends RuntimeException {
    private final ErrorCode errorCode;
    private final Instant timestamp;

    public enum ErrorCode {
        AI_SERVICE_FAILURE,
        DATA_STORAGE_ERROR,
        PROCESSING_TIMEOUT,
        UNKNOWN_ERROR
    }

    public PlanGenerationException(String message) {
        this(message, ErrorCode.UNKNOWN_ERROR);
    }

    public PlanGenerationException(String message, ErrorCode errorCode) {
        this(message, errorCode, null);
    }

    public PlanGenerationException(String message, ErrorCode errorCode, Throwable cause) {
        super(message, cause);
        this.errorCode = errorCode;
        this.timestamp = Instant.now();
    }

}
