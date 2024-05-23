package com.AccountRentalHub.services;

public interface OrderService {
    void changeOrderStatus(Long orderID, String status);
}
