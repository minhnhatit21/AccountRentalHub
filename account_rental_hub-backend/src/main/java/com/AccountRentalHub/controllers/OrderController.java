package com.AccountRentalHub.controllers;

import com.AccountRentalHub.payload.request.AddToCartRequest;
import com.AccountRentalHub.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    OrderService orderService;

    @PostMapping("/changeStatus")
    public ResponseEntity<String> changeOrderStatus(@RequestParam Long orderID, @RequestParam String status) {
        try {
            orderService.changeOrderStatus(orderID,status);
            return ResponseEntity.ok("Change order status successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error change order status: " + e.getMessage());
        }
    }
}
