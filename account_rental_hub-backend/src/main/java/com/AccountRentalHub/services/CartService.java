package com.AccountRentalHub.services;

import com.AccountRentalHub.models.CartItem;
import com.AccountRentalHub.models.Order;
import com.AccountRentalHub.payload.response.CartItemResponse;

import java.util.List;

public interface CartService {
    void addItemToCart(Long userId, Long accountPackageId, Integer quantity);

    List<CartItemResponse> getCartItems(Long userId);
    Order createOrderFromCart(Long userId);

    void removeCartItems(Long cartItemId);
}
