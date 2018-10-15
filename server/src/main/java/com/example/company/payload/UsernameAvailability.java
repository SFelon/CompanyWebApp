package com.example.company.payload;

public class UsernameAvailability {
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
