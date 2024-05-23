package com.AccountRentalHub.services;

import com.AccountRentalHub.models.AccountRental;
import com.AccountRentalHub.models.Enum.EOrderStatus;
import com.AccountRentalHub.models.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Date;
import java.util.Optional;

public interface OrderService {
    void changeOrderStatus(Long orderID, String status);
    Optional<Order> getOrdersByCode(String orderCode);
    Page<Order> searchOrdersByCriteria(String orderCode, Long userId, Date startDate, Date endDate,String status, Pageable pageable);
}
