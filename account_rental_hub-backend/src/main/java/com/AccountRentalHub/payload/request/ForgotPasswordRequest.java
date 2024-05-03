package com.AccountRentalHub.payload.request;

import jakarta.validation.constraints.NotBlank;


public class ForgotPasswordRequest {

    @NotBlank
    private String email;

    public ForgotPasswordRequest() {
    }

    public ForgotPasswordRequest(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
