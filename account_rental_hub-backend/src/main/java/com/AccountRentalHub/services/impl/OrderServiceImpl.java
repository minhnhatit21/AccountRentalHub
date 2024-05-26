package com.AccountRentalHub.services.impl;

import com.AccountRentalHub.models.Enum.EOrderStatus;
import com.AccountRentalHub.models.Order;
import com.AccountRentalHub.repository.OrderRepository;
import com.AccountRentalHub.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Objects;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    OrderRepository orderRepository;
    @Override
    public void changeOrderStatus(Long orderID, String status) {
        Optional<Order> order = orderRepository.findById(orderID);
        if(order.isPresent()) {
            Order exitingOrder = order.get();
            if(Objects.equals(status, EOrderStatus.FINISHED.toString()) && Objects.equals(exitingOrder.getStatus(), EOrderStatus.PAID.toString())) {
                exitingOrder.setStatus(EOrderStatus.FINISHED.toString());
            } else if(Objects.equals(status, EOrderStatus.CANCELLED.toString()) && !Objects.equals(exitingOrder.getStatus(), EOrderStatus.FINISHED.toString())) {
                exitingOrder.setStatus(EOrderStatus.CANCELLED.toString());
            } else if(Objects.equals(status, EOrderStatus.PAID.toString())) {
                exitingOrder.setStatus(EOrderStatus.PAID.toString());
            }
            orderRepository.save(exitingOrder);
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
