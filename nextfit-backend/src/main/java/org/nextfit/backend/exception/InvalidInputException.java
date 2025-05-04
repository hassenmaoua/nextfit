package org.nextfit.backend.exception;

import lombok.Getter;

import java.time.Instant;
import java.util.Collections;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Thrown when user input fails validation checks
 */
@Getter
public class InvalidInputException extends RuntimeException {
    // Get field-specific error messages
    private final Map<String, String> fieldErrors;
    // Get when the error occurred
    private final Instant timestamp;

    public InvalidInputException(String message, Map<String, String> fieldErrors) {
        super(message);
        this.fieldErrors = Collections.unmodifiableMap(fieldErrors);
        this.timestamp = Instant.now();
    }

    public InvalidInputException(Map<String, String> fieldErrors) {
        super("Validation failed for " + fieldErrors.keySet());
        this.fieldErrors = Collections.unmodifiableMap(fieldErrors);
        this.timestamp = Instant.now();
    }

    // Format all errors as a single string
    public String getFormattedErrors() {
        return fieldErrors.entrySet().stream()
                .map(entry -> String.format("%s: %s", entry.getKey(), entry.getValue()))
                .collect(Collectors.joining("; "));
    }
}