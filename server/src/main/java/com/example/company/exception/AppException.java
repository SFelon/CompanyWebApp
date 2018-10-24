package com.example.company.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;



@ResponseStatus(HttpStatus.EXPECTATION_FAILED)
public class AppException extends RuntimeException {

    private static final Logger logger = LoggerFactory.getLogger(AppException.class);

    public AppException(String message) {
        super(message);
    }
    public AppException(String message, Throwable cause) {
        super(message, cause);
    }
}
