package org.nextfit.backend.exception;

public class ExpiredTokenException extends RuntimeException {
    public ExpiredTokenException() {
    }

    public ExpiredTokenException(String message) {
        super(message);
    }
}
