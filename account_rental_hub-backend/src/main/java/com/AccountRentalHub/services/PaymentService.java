package com.AccountRentalHub.services;

import com.AccountRentalHub.payload.request.PaymentRequest;


public interface PaymentService {
    void processPayment(PaymentRequest paymentRequest);
}
