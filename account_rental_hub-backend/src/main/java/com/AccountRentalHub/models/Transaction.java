//package com.AccountRentalHub.models;
//
//import jakarta.persistence.Entity;
//import jakarta.persistence.JoinColumn;
//import jakarta.persistence.ManyToOne;
//import jakarta.persistence.Table;
//
//import java.util.Date;
//
//@Entity
//@Table(name = "transaction")
//public class Transaction extends BaseEntity{
//    @ManyToOne
//    @JoinColumn(name = "order_id",referencedColumnName = "id")
//    private Order order;
//
//    @ManyToOne
//    @JoinColumn(name = "customer_id",referencedColumnName = "id")
//    private Customer customer;
//
//    private Date transactionDate;
//    private Double amount;
//    private String paymentMethod;
//    private String status;
//
//    public Order getOrder() {
//        return order;
//    }
//
//    public void setOrder(Order order) {
//        this.order = order;
//    }
//
//    public Customer getCustomer() {
//        return customer;
//    }
//
//    public void setCustomer(Customer customer) {
//        this.customer = customer;
//    }
//
//    public Date getTransactionDate() {
//        return transactionDate;
//    }
//
//    public void setTransactionDate(Date transactionDate) {
//        this.transactionDate = transactionDate;
//    }
//
//    public Double getAmount() {
//        return amount;
//    }
//
//    public void setAmount(Double amount) {
//        this.amount = amount;
//    }
//
//    public String getPaymentMethod() {
//        return paymentMethod;
//    }
//
//    public void setPaymentMethod(String paymentMethod) {
//        this.paymentMethod = paymentMethod;
//    }
//
//    public String getStatus() {
//        return status;
//    }
//
//    public void setStatus(String status) {
//        this.status = status;
//    }
//}
