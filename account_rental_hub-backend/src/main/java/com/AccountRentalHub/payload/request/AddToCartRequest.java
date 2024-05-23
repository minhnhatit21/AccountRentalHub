package com.AccountRentalHub.payload.request;

public class AddToCartRequest {
    private Long userId;
    private Long accountRentalId;
    private Integer quantity;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getAccountRentalId() {
        return accountRentalId;
    }

    public void setAccountRentalId(Long accountRentalId) {
        this.accountRentalId = accountRentalId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
