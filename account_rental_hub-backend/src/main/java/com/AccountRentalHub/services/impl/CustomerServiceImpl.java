package com.AccountRentalHub.services.impl;

import com.AccountRentalHub.models.Customer;
import com.AccountRentalHub.repository.CustomerRepository;
import com.AccountRentalHub.services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepository customerRepository;


    /**
     * Create new customer
     * @param customer
     * @return new Customer
     */
    @Override
    public Customer createCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    /**
     * Find customer by ID
     * @param id
     * @return
     */
    @Override
    public Optional<Customer> getCustomerById(Long id) {
        return customerRepository.findById(id);
    }

    @Override
    public Optional<Customer> getCustomerByUserId(Long id) {
        return customerRepository.findByUserId(id);
    }

    /**
     * Update Customer
     * @param id
     * @param newCustomerData
     * @return
     */
    @Override
    public Customer updateCustomer(Long id, Customer newCustomerData) {
        Optional<Customer> existingCustomerOptional = customerRepository.findById(id);
        if (existingCustomerOptional.isPresent()) {
            Customer existingCustomer = existingCustomerOptional.get();
            existingCustomer.setUserId(newCustomerData.getUserId());
            existingCustomer.setFullname(newCustomerData.getFullname());
            existingCustomer.setPhone(newCustomerData.getPhone());
            existingCustomer.setAddress(newCustomerData.getAddress());
            // Cập nhật createdAt và updatedAt không cần thiết vì chúng sẽ được tự động cập nhật
            return customerRepository.save(existingCustomer);
        } else {
            // Xử lý khi không tìm thấy Customer
            return null;
        }
    }

    /**
     * Delete Customer by ID
     * @param id
     */
    @Override
    public void deleteCustomer(Long id) {
        customerRepository.deleteById(id);
    }

    /**
     * Get All Customer
     * @return
     */
    @Override
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }
}
