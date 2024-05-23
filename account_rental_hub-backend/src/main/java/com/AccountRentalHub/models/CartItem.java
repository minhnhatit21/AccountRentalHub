package com.AccountRentalHub.models;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "cart_item")
public class CartItem extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "cart_id", referencedColumnName = "id")
    private Cart cart;

    @ManyToOne
    @JoinColumn(name = "account_rental_id", referencedColumnName = "id")
    private AccountRental accountRental;

    private Integer quantity;

    public Cart getCart() {
        return cart;
    }

    public void setCart(Cart cart) {
        this.cart = cart;
    }

    public AccountRental getAccountRental() {
        return accountRental;
    }

    public void setAccountRental(AccountRental accountRental) {
        this.accountRental = accountRental;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    // Getters and Setters
}