package com.AccountRentalHub.models;

import jakarta.persistence.*;

@Entity
@Table(name = "account_rental")
public class AccountRental extends BaseEntity{
    @Column(name = "acount_rental_username")
    private String username;
    @Column(name = "acount_rental_email")
    private String email;
    @Column(name = "acount_rental_password")
    private String password;
    @Column(name = "acount_rental_status")
    private String status;
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

    public AccountRentalPackage getAccountRentalPackage() {
        return accountRentalPackage;
    }

    public void setAccountRentalPackage(AccountRentalPackage accountRentalPackage) {
        this.accountRentalPackage = accountRentalPackage;
    }
}
