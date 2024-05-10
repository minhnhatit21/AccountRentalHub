package com.AccountRentalHub.models;

import jakarta.persistence.*;

@Entity
@Table(name = "customer")
public class Customer extends BaseEntity{

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "fullname")
    private String fullname;

    @Column(name = "phone")
    private String phone;

    @Column(name = "adress")
    private String address;


    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", insertable = false, updatable = false)
    private User user;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
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
