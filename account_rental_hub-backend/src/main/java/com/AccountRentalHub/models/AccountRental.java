package com.AccountRentalHub.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.Date;

@Entity
@Table(name = "account_rental")
public class AccountRental extends BaseEntity{
    @Column(name = "acount_rental_username")
    @NotBlank(message = "Username cannot be blank")
    private String username;

    @Column(name = "acount_rental_email")
    @NotBlank(message = "email account rental cannot be blank")
    private String email;

    @Column(name = "acount_rental_password")
    @NotBlank(message = "password account rental cannot be blank")
    private String password;

    @Column(name = "acount_rental_status")
    @NotBlank(message = "status account rental cannot be blank")
    private String status;

    @Column(name = "renew_start_date")
    @NotNull(message = "RenewStartDate account rental cannot be null")
    private Date renewStartDate;

    @NotNull(message = "RenewEndDate account rental cannot be null")
    @Column(name = "renew_end_date")
    private Date renewEndDate;

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

    public AccountRentalPackage getAccountRentalPackage() {
        return accountRentalPackage;
    }

    public void setAccountRentalPackage(AccountRentalPackage accountRentalPackage) {
        this.accountRentalPackage = accountRentalPackage;
    }
}
