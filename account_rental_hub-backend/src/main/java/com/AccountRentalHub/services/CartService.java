package com.AccountRentalHub.services;

public interface CartService {
    void addItemToCart(Long userId, Long accountRentalId, Integer quantity);
    void createOrderFromCart(Long userId);
}
