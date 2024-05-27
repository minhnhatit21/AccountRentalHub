package com.AccountRentalHub.services.impl;

import com.AccountRentalHub.models.*;
import com.AccountRentalHub.models.Enum.EOrderStatus;
import com.AccountRentalHub.models.Enum.ERentalHistoryStatus;
import com.AccountRentalHub.payload.request.PaymentRequest;
import com.AccountRentalHub.repository.*;
import com.AccountRentalHub.services.PaymentService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;
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

    @Override
    @Transactional
    public void processPayment(PaymentRequest paymentRequest) {
        // Fetch order and customer details
        Order order = orderRepository.findById(paymentRequest.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found"));

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

        // Update Rental History and AccountRentalPackage
        List<RentalHistory> rentalHistories = order.getOrderDetails().stream().map(orderDetail -> {
            AccountRentalPackage accountRentalPackage = orderDetail.getRentalAccount().getAccountRentalPackage();
            AccountRental accountRental = orderDetail.getRentalAccount();
            // Check if the amount is greater than 1
            if (accountRentalPackage.getAmount() >= 1 && accountRental.getAmountUsers() >= 1) {
                RentalHistory rentalHistory = new RentalHistory();
                rentalHistory.setCustomer(customer);
                rentalHistory.setRentalAccount(orderDetail.getRentalAccount());
                rentalHistory.setStartDate(new Date());

                // Calculate end date based on the duration of the rental package
                Calendar calendar = Calendar.getInstance();
                calendar.setTime(rentalHistory.getStartDate());
                calendar.add(Calendar.DAY_OF_MONTH, accountRentalPackage.getDuration());
                rentalHistory.setEndDate(calendar.getTime());

                rentalHistory.setStatus(ERentalHistoryStatus.ACTIVE.toString());

                // Decrease the amount of the package by 1
//                accountRentalPackage.setAmount(accountRentalPackage.getAmount() - 1);
//                accountRentalPackageRepository.save(accountRentalPackage);

                accountRental.setAmountUsers(accountRental.getAmountUsers() - 1);
                accountRentalRepository.save(accountRental);


                return rentalHistory;
            } else {
                throw new RuntimeException("The selected rental package is out of stock or account rental is out of stock");
            }
        }).collect(Collectors.toList());

        rentalHistoryRepository.saveAll(rentalHistories);
    }


}
