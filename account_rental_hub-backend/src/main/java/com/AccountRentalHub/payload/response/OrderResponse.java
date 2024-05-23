package com.AccountRentalHub.payload.response;

import java.util.Date;
import java.util.List;

public class OrderResponse {
    private Long id;
    private String orderCode;
    private Date orderDate;
    private Double totalAmount;
    private String status;

    private String rentalCustomerName;
    private String rentalCustomerEmail;
    private List<OrderDetailResponse> orderDetails;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOrderCode() {
        return orderCode;
    }

    public void setOrderCode(String orderCode) {
        this.orderCode = orderCode;
    }

    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getRentalCustomerName() {
        return rentalCustomerName;
    }

    public void setRentalCustomerName(String rentalCustomerName) {
        this.rentalCustomerName = rentalCustomerName;
    }

    public String getRentalCustomerEmail() {
        return rentalCustomerEmail;
    }

    public void setRentalCustomerEmail(String rentalCustomerEmail) {
        this.rentalCustomerEmail = rentalCustomerEmail;
    }

    public List<OrderDetailResponse> getOrderDetails() {
        return orderDetails;
    }

    public void setOrderDetails(List<OrderDetailResponse> orderDetails) {
        this.orderDetails = orderDetails;
    }
}
