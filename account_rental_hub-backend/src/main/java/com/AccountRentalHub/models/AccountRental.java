package com.AccountRentalHub.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.Date;

@Entity
@Table(name = "account_rental")
public class AccountRental extends BaseEntity{
    @Column(name = "acount_rental_username")
    private String username;

    @Column(name = "acount_rental_email")
    private String email;

    @Column(name = "account_rental_password")
    private String password;

    @Column(name = "account_rental_status")
    private String status;

    @Column(name = "renew_start_date")
    private Date renewStartDate;

    @Column(name = "renew_end_date")
    private Date renewEndDate;

    @Column(name = "amount_user")
    @Max(value = 4, message = "Maximum number of users is 4")
    @Min(value = 0, message = "Minimum number of users is 1")
    private Integer amountUsers = 4;

    @ManyToOne
    @JoinColumn(name = "account_rental_package_id", referencedColumnName = "id")
    private AccountRentalPackage accountRentalPackage;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getRenewStartDate() {
        return renewStartDate;
    }

    public void setRenewStartDate(Date renewStartDate) {
        this.renewStartDate = renewStartDate;
    }

    public Date getRenewEndDate() {
        return renewEndDate;
    }

    public void setRenewEndDate(Date renewEndDate) {
        this.renewEndDate = renewEndDate;
    }

    public Integer getAmountUsers() {
        return amountUsers;
    }

    public void setAmountUsers(Integer amountUsers) {
        this.amountUsers = amountUsers;
    }

    public AccountRentalPackage getAccountRentalPackage() {
        return accountRentalPackage;
    }

    public void setAccountRentalPackage(AccountRentalPackage accountRentalPackage) {
        this.accountRentalPackage = accountRentalPackage;
    }
}
