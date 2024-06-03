package com.AccountRentalHub.services;

import com.AccountRentalHub.payload.request.PaymentRequest;
import jakarta.mail.MessagingException;

import java.io.IOException;
import java.security.GeneralSecurityException;


public interface PaymentService {
    void processPayment(PaymentRequest paymentRequest) throws MessagingException, GeneralSecurityException, IOException;
}
