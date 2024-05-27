package com.AccountRentalHub.payload.response;

import com.AccountRentalHub.models.AccountRental;
import com.AccountRentalHub.models.AccountRentalPackage;

public class OrderDetailResponse {
    private Long id;
    private Double unitPrice;
    private AccountRental accountRental;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(Double unitPrice) {
        this.unitPrice = unitPrice;
    }

    public AccountRental getAccountRental() {
        return accountRental;
    }

    public void setAccountRental(AccountRental accountRental) {
        this.accountRental = accountRental;
    }
}
