//package com.AccountRentalHub.models;
//
//import jakarta.persistence.*;
//
//import java.util.Date;
//import java.util.List;
//
//@Entity
//@Table(name = "order")
//public class Order extends BaseEntity {
//
//    @ManyToOne
//    @JoinColumn(name = "customer_id",referencedColumnName = "id")
//    private Customer customer;
//
//    private Date orderDate;
//    private Double totalAmount;
//    private String status;
//
//    @OneToMany(mappedBy = "order")
//    private List<OrderDetail> orderDetails;
//
//    @OneToMany(mappedBy = "order")
//    private List<Transaction> transactions;
//
//    public Customer getCustomer() {
//        return customer;
//    }
//
//    public void setCustomer(Customer customer) {
//        this.customer = customer;
//    }
//
//    public Date getOrderDate() {
//        return orderDate;
//    }
//
//    public void setOrderDate(Date orderDate) {
//        this.orderDate = orderDate;
//    }
//
//    public Double getTotalAmount() {
//        return totalAmount;
//    }
//
//    public void setTotalAmount(Double totalAmount) {
//        this.totalAmount = totalAmount;
//    }
//
//    public String getStatus() {
//        return status;
//    }
//
//    public void setStatus(String status) {
//        this.status = status;
//    }
//
//    public List<OrderDetail> getOrderDetails() {
//        return orderDetails;
//    }
//
//    public void setOrderDetails(List<OrderDetail> orderDetails) {
//        this.orderDetails = orderDetails;
//    }
//
//    public List<Transaction> getTransactions() {
//        return transactions;
//    }
//
//    public void setTransactions(List<Transaction> transactions) {
//        this.transactions = transactions;
//    }
//
//    // Getters and Setters
//}