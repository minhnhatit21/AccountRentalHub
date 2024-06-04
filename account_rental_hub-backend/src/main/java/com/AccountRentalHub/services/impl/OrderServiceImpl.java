package com.AccountRentalHub.services.impl;

import com.AccountRentalHub.models.*;
import com.AccountRentalHub.models.Enum.EAccountRental;
import com.AccountRentalHub.models.Enum.EOrderStatus;
import com.AccountRentalHub.models.Enum.ERentalHistoryStatus;
import com.AccountRentalHub.repository.AccountRentalRepository;
import com.AccountRentalHub.repository.OrderDetailRepository;
import com.AccountRentalHub.repository.OrderRepository;
import com.AccountRentalHub.repository.RentalHistoryRepository;
import com.AccountRentalHub.security.services.EmailService;
import com.AccountRentalHub.services.OrderService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    RentalHistoryRepository historyRepository;

    @Autowired
    AccountRentalRepository accountRentalRepository;

    @Autowired
    OrderDetailRepository orderDetailRepository;

    @Autowired
    EmailService emailService;
    @Override
    public void changeOrderStatus(Long orderID, String status) {
        Optional<Order> order = orderRepository.findById(orderID);
        if(order.isPresent()) {
            Order exitingOrder = order.get();
            if(Objects.equals(status, EOrderStatus.FINISHED.toString()) && Objects.equals(exitingOrder.getStatus(), EOrderStatus.PAID.toString())) {
                confirmOrder(exitingOrder,exitingOrder.getCustomer());
            } else if(Objects.equals(status, EOrderStatus.CANCELLED.toString()) && !Objects.equals(exitingOrder.getStatus(), EOrderStatus.FINISHED.toString())) {
                exitingOrder.setStatus(EOrderStatus.CANCELLED.toString());
            } else if(Objects.equals(status, EOrderStatus.PAID.toString())) {
                exitingOrder.setStatus(EOrderStatus.PAID.toString());
            }
            orderRepository.save(exitingOrder);
        }
    }

    @Override
    public void confirmOrder(Order order, Customer customer) {
        // Update Rental History and AccountRentalPackage
        List<RentalHistory> rentalHistories = order.getOrderDetails().stream().map(orderDetail -> {
            AccountRentalPackage accountRentalPackage = orderDetail.getRentalAccount().getAccountRentalPackage();
            AccountRental accountRental = orderDetail.getRentalAccount();
            // Check if the amount is greater than 1
            if (accountRental.getAmountUsers() >= 1) {
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
                if(accountRental.getAmountUsers() < 1 ) {
                    accountRental.setStatus(EAccountRental.FULL.toString());
                }
                accountRentalRepository.save(accountRental);



                return rentalHistory;
            } else {
                throw new RuntimeException("The selected rental package is out of stock or account rental is out of stock");
            }
        }).collect(Collectors.toList());

        historyRepository.saveAll(rentalHistories);

        order.setStatus(EOrderStatus.FINISHED.toString());

        orderRepository.save(order);

        // Send email
        try {
            emailService.sendOrderConfirmationEmail(order.getCustomer().getUser().getEmail(), order);
        } catch (Exception e) {
            throw new RuntimeException("Can not send email");
        }

    }

    @Override
    @Transactional
    public void deleteOrder(Long orderId) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();

            List<OrderDetail> orderDetails = orderDetailRepository.findByOrderOrderCode(order.getOrderCode());
            orderDetailRepository.deleteAll(orderDetails);

            orderRepository.delete(order);
        } else {
            throw new RuntimeException("Order not found with id: " + orderId);
        }
    }

    @Override
    public Optional<Order> getOrdersByCode(String orderCode) {
       return orderRepository.findByOrderCode(orderCode);
    }

    @Override
    public Page<Order> searchOrdersByCriteria(String orderCode, Long userId, Date startDate, Date endDate,String status, Pageable pageable) {
        return orderRepository.findOrdersByCriteria(orderCode, userId, startDate, endDate, status ,pageable);
    }

}
