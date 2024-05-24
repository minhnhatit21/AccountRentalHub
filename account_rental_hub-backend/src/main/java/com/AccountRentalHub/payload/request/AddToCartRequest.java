package com.AccountRentalHub.payload.request;

public class AddToCartRequest {
    private Long userId;
    private Long accountPackageId;
    private Integer quantity;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getAccountPackageId() {
        return accountPackageId;
    }

    public void setAccountPackageId(Long accountPackageId) {
        this.accountPackageId = accountPackageId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
