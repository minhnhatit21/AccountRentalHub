package com.AccountRentalHub.services;

public interface CartService {
    void addItemToCart(Long userId, Long accountPackageId, Integer quantity);
    void createOrderFromCart(Long userId);
}
