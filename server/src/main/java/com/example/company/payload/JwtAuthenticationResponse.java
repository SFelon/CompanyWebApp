package com.example.company.payload;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class JwtAuthenticationResponse {

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationResponse.class);

    private String accessToken;
    private String tokenType = "Bearer";

    public JwtAuthenticationResponse(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }
}
