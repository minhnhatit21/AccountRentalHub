package com.AccountRentalHub.models;

import jakarta.persistence.*;

@Entity
@Table(name = "account_rental_service")
public class AccountRentalServices extends BaseEntity{

    @Column(name = "service_name")
    private String name;
    @Column(name = "service_image")
    private String image;
    @Column(name = "service_description")
    private String description;

    @Column(name = "service_link_website")
    private String website;

    @OneToOne(mappedBy = "accountRentalService")
    private AccountRentalPackage accountRentalPackage;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public AccountRentalPackage getAccountRentalPackage() {
        return accountRentalPackage;
    }

    public void setAccountRentalPackage(AccountRentalPackage accountRentalPackage) {
        this.accountRentalPackage = accountRentalPackage;
    }
}
