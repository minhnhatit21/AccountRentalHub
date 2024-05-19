//package com.AccountRentalHub.models;
//
//import jakarta.persistence.Entity;
//import jakarta.persistence.JoinColumn;
//import jakarta.persistence.ManyToOne;
//import jakarta.persistence.Table;
//
//import java.util.Date;
//
//@Table(name = "notification")
//@Entity
//public class Notification extends BaseEntity{
//    @ManyToOne
//    @JoinColumn(name = "customer_id", referencedColumnName = "id")
//    private Customer customer;
//
//    private String title;
//    private String message;
//    private String notificationType;
//    private Date sentDate;
//    private String status;
//
//    public Customer getCustomer() {
//        return customer;
//    }
//
//    public void setCustomer(Customer customer) {
//        this.customer = customer;
//    }
//
//    public String getTitle() {
//        return title;
//    }
//
//    public void setTitle(String title) {
//        this.title = title;
//    }
//
//    public String getMessage() {
//        return message;
//    }
//
//    public void setMessage(String message) {
//        this.message = message;
//    }
//
//    public String getNotificationType() {
//        return notificationType;
//    }
//
//    public void setNotificationType(String notificationType) {
//        this.notificationType = notificationType;
//    }
//
//    public Date getSentDate() {
//        return sentDate;
//    }
//
//    public void setSentDate(Date sentDate) {
//        this.sentDate = sentDate;
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
