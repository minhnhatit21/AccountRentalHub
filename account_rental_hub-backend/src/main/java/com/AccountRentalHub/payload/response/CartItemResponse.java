package com.AccountRentalHub.payload.response;

import com.AccountRentalHub.models.AccountRentalPackage;

public class CartItemResponse {
    private Long id;
    private AccountRentalPackage accountRentalPackage;
    private Integer quantity;

    public CartItemResponse(Long id, AccountRentalPackage accountRentalPackage, Integer quantity) {
        this.id = id;
        this.accountRentalPackage = accountRentalPackage;
        this.quantity = quantity;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AccountRentalPackage getAccountRentalPackage() {
        return accountRentalPackage;
    }

    public void setAccountRentalPackage(AccountRentalPackage accountRentalPackage) {
        this.accountRentalPackage = accountRentalPackage;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
