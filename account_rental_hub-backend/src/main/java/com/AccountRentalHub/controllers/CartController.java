package com.AccountRentalHub.controllers;

import com.AccountRentalHub.models.CartItem;
import com.AccountRentalHub.models.Order;
import com.AccountRentalHub.models.OrderDetail;
import com.AccountRentalHub.payload.request.AddToCartRequest;
import com.AccountRentalHub.payload.response.CartItemResponse;
import com.AccountRentalHub.payload.response.OrderDetailResponse;
import com.AccountRentalHub.payload.response.OrderResponse;
import com.AccountRentalHub.services.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("/items")
    public ResponseEntity<List<CartItemResponse>> getCartItemsByUserId(@RequestParam Long userId) {
        try {
            List<CartItemResponse> cartItems = cartService.getCartItems(userId);
            return new ResponseEntity<>(cartItems, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<String> addItemToCart(@RequestBody AddToCartRequest addToCartRequest) {
        try {
            cartService.addItemToCart(addToCartRequest.getUserId(), addToCartRequest.getAccountPackageId(), addToCartRequest.getQuantity());
            return ResponseEntity.ok("Item added to cart successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding item to cart: " + e.getMessage());
        }
    }

    @PostMapping("/checkout")
    public ResponseEntity<?> checkout(@RequestParam Long userId) {
        try {
            Order order =  cartService.createOrderFromCart(userId);
            Map<String, Object> response = new HashMap<>();
            OrderResponse orderResponse = convertToOrderResponse(order);
            response.put("order", orderResponse);
            response.put("message", "Order created successfully");

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating order: " + e.getMessage());
        }
    }

    @DeleteMapping("/items/{id}")
    public ResponseEntity<?> deleteCartItemByIs(@PathVariable Long id) {
        try {
            cartService.removeCartItems(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting: " + e.getMessage());
        }


    }

    private OrderResponse convertToOrderResponse(Order order) {
        OrderResponse orderResponse = new OrderResponse();
        orderResponse.setId(order.getId());
        orderResponse.setOrderCode(order.getOrderCode());
        orderResponse.setOrderDate(order.getOrderDate());
        orderResponse.setTotalAmount(order.getTotalAmount());
        orderResponse.setStatus(order.getStatus());
        orderResponse.setRentalCustomerName(order.getCustomer().getFullname());
        orderResponse.setRentalCustomerEmail(order.getCustomer().getUser().getEmail());
        orderResponse.setOrderDetails(order.getOrderDetails().stream().map(this::convertToOrderDetailResponse).collect(Collectors.toList()));
        return orderResponse;
    }

    private OrderDetailResponse convertToOrderDetailResponse(OrderDetail orderDetail) {
        OrderDetailResponse detailResponse = new OrderDetailResponse();
        detailResponse.setId(orderDetail.getId());
        detailResponse.setAccountRental(orderDetail.getRentalAccount());
        detailResponse.setUnitPrice(orderDetail.getUnitPrice());
        return detailResponse;
    }
}
