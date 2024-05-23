package com.AccountRentalHub.models;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Table(name = "review")
@Entity
public class Review extends BaseEntity{
    @ManyToOne
    @JoinColumn(name = "customer_id",referencedColumnName = "id")
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "account_id",referencedColumnName = "id")
    private AccountRental rentalAccount;

    private Integer rating;
    private String comment;

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public AccountRental getRentalAccount() {
        return rentalAccount;
    }

    public void setRentalAccount(AccountRental rentalAccount) {
        this.rentalAccount = rentalAccount;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
