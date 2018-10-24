package com.example.company.payload;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class UsernameAvailability {

    private static final Logger logger = LoggerFactory.getLogger(UsernameAvailability.class);

    private Boolean available;

    public UsernameAvailability(Boolean available) {
        this.available = available;
    }

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }
}
