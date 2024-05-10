package com.AccountRentalHub.services;

import com.AccountRentalHub.models.Customer;

import java.util.List;
import java.util.Optional;

public interface CustomerService {
    Customer createCustomer(Customer customer);
    Optional<Customer> getCustomerById(Long id);

    Optional<Customer> getCustomerByUserId(Long id);
    Customer updateCustomer(Long id, Customer newCustomerData);
    void deleteCustomer(Long id);
    List<Customer> getAllCustomers();
}
