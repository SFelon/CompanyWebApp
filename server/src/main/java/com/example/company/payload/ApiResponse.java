package com.example.company.payload;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ApiResponse {

    private static final Logger logger = LoggerFactory.getLogger(ApiResponse.class);

    private Boolean success;
    private String message;

    public ApiResponse(Boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public Boolean getSuccess() {
        return success;
    }

    public void setSuccess(Boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
