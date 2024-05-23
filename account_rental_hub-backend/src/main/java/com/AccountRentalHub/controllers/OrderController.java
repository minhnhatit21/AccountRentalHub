package com.AccountRentalHub.controllers;

import com.AccountRentalHub.models.AccountRental;
import com.AccountRentalHub.models.Order;
import com.AccountRentalHub.models.OrderDetail;
import com.AccountRentalHub.payload.request.AddToCartRequest;
import com.AccountRentalHub.payload.response.CustomPageResponse;
import com.AccountRentalHub.payload.response.OrderDetailResponse;
import com.AccountRentalHub.payload.response.OrderResponse;
import com.AccountRentalHub.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
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

    @GetMapping("/{orderCode}")
    public ResponseEntity<OrderResponse> getOrderByOrderCode(@PathVariable String orderCode) {
        Optional<Order> orderOptional = orderService.getOrdersByCode(orderCode);
        return orderOptional.map(order -> new ResponseEntity<>(convertToOrderResponse(order), HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/search")
    public ResponseEntity<CustomPageResponse<OrderResponse>> searchOrders(
            @RequestParam(required = false) String orderCode,
            @RequestParam(required = false) Long userId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date endDate,
            @RequestParam(required = false) String status,
            Pageable pageable) {

        Page<Order> searchResult = orderService.searchOrdersByCriteria(orderCode, userId, startDate, endDate,status, pageable);

        if (searchResult.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            CustomPageResponse<OrderResponse> response = new CustomPageResponse<>(
                    searchResult.getContent().stream().map(this::convertToOrderResponse).collect(Collectors.toList()),
                    searchResult.getNumber(),
                    searchResult.getSize(),
                    searchResult.getTotalElements(),
                    searchResult.getTotalPages()
            );
            return new ResponseEntity<>(response, HttpStatus.OK);
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
