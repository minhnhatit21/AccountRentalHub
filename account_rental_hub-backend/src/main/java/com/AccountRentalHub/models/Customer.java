package com.AccountRentalHub.models;

import jakarta.persistence.*;

@Entity
@Table(name = "customer")
public class Customer extends BaseEntity{

    @Column(name = "fullame")
    private String fullName;

    @Column(name = "phone")
    private String phone;

    @Column(name = "address")
    private String address;


    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    public Customer() {
    }

    public String getFullname() {
        return fullName;
    }

    public void setFullname(String fullname) {
        this.fullName = fullname;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

}
