package com.AccountRentalHub.services.impl;

import com.AccountRentalHub.models.*;
import com.AccountRentalHub.models.Enum.EOrderStatus;
import com.AccountRentalHub.models.Enum.ERentalHistoryStatus;
import com.AccountRentalHub.payload.request.PaymentRequest;
import com.AccountRentalHub.repository.*;
import com.AccountRentalHub.security.services.EmailService;
import com.AccountRentalHub.services.PaymentService;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private RentalHistoryRepository rentalHistoryRepository;

    @Autowired
    private AccountRentalPackageRepository accountRentalPackageRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private AccountRentalRepository accountRentalRepository;

    @Autowired
    private EmailService emailService;

    @Override
    @Transactional
    public void processPayment(PaymentRequest paymentRequest) {
        // Fetch order and customer details
        Order order = orderRepository.findById(paymentRequest.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if(Objects.equals(order.getStatus(), EOrderStatus.PAID.toString())) {
            throw new RuntimeException("Order has been paid");
        }

        if(Objects.equals(order.getStatus(), EOrderStatus.FINISHED.toString())) {
            throw new RuntimeException("Order has been completed");
        }

        Optional<Customer> optionalCustomer = customerRepository.findByUserId(paymentRequest.getUserId());
        Customer customer = optionalCustomer.get();
        if (!order.getCustomer().getId().equals(customer.getId())) {
            throw new RuntimeException("Order does not belong to the customer");
        }

        // Process payment (mock implementation)
        if (paymentRequest.getAmount() < order.getTotalAmount()) {
            throw new RuntimeException("Insufficient payment amount");
        }

        // Create a transaction record
        Transaction transaction = new Transaction();
        transaction.setOrder(order);
        transaction.setCustomer(customer);
        transaction.setTransactionDate(new Date());
        transaction.setAmount(paymentRequest.getAmount());
        transaction.setPaymentMethod(paymentRequest.getPaymentMethod());
        transaction.setStatus("SUCCESS");
        transactionRepository.save(transaction);

        // Update order status
        order.setStatus(EOrderStatus.PAID.toString());
        orderRepository.save(order);

        try {
            emailService.sendOrderPaymentEmail(order.getCustomer().getUser().getEmail(), order);
        } catch (Exception e) {
            throw new RuntimeException("Can not send email");
        }
    }


}
