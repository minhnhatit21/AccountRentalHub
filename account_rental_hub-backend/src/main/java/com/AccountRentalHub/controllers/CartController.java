package com.AccountRentalHub.controllers;

import com.AccountRentalHub.payload.request.AddToCartRequest;
import com.AccountRentalHub.services.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<String> addItemToCart(@RequestBody AddToCartRequest addToCartRequest) {
        try {
            cartService.addItemToCart(addToCartRequest.getUserId(), addToCartRequest.getAccountRentalId(), addToCartRequest.getQuantity());
            return ResponseEntity.ok("Item added to cart successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding item to cart: " + e.getMessage());
        }
    }

    @PostMapping("/checkout")
    public ResponseEntity<String> checkout(@RequestParam Long userId) {
        try {
            cartService.createOrderFromCart(userId);
            return ResponseEntity.ok("Order created successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating order: " + e.getMessage());
        }
    }
}
