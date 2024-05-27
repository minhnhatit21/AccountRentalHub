package com.AccountRentalHub.models;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "account_rental_package")
public class AccountRentalPackage extends BaseEntity{

    @Column(name = "account_package_name")
    private String name;
    @Column(name = "duration")
    private Integer duration;
    @Column(name = "price")
    private Double price;
    @Column(name = "discounted_price")
    private Double discountedPrice;
    @Column(name = "discount")
    private Integer discount;
    @Column(name = "description")
    private String description;
    @Column(name = "img_url")
    private String imgURL;
    @Column(name = "amount")
    private Long amount;

    @ManyToOne
    @JoinColumn(name = "service_id", referencedColumnName = "id", unique = false)
    private AccountRentalServices accountRentalServices;

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Double getDiscountedPrice() {
        return discountedPrice;
    }

    public void setDiscountedPrice(Double discountedPrice) {
        this.discountedPrice = discountedPrice;
    }

    public Integer getDiscount() {
        return discount;
    }

    public void setDiscount(Integer discount) {
        this.discount = discount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImgURL() {
        return imgURL;
    }

    public void setImgURL(String imgURL) {
        this.imgURL = imgURL;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public AccountRentalServices getAccountRentalServices() {
        return accountRentalServices;
    }

    public void setAccountRentalServices(AccountRentalServices accountRentalServices) {
        this.accountRentalServices = accountRentalServices;
    }
}
