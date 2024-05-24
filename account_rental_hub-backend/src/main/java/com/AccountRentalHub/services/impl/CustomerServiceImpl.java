package com.AccountRentalHub.services.impl;

import com.AccountRentalHub.models.Customer;
import com.AccountRentalHub.repository.CustomerRepository;
import com.AccountRentalHub.services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Transactional
    @Override
    public Customer createCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    @Override
    public Optional<Customer> getCustomerById(Long id) {
        return customerRepository.findById(id);
    }

    @Override
    public Optional<Customer> getCustomerByUserId(Long id) {
        return customerRepository.findByUserId(id);
    }

//    @Override
//    public Optional<Customer> getCustomerByUserId(Long id) {
//        return customerRepository.findByUserId(id);
//    }

    @Transactional
    @Override
    public Customer updateCustomer(Long id, Customer newCustomerData) {
        Optional<Customer> existingCustomerOptional = customerRepository.findById(id);
        if (existingCustomerOptional.isPresent()) {
            Customer existingCustomer = existingCustomerOptional.get();
            existingCustomer.setFullname(newCustomerData.getFullname());
            existingCustomer.setPhone(newCustomerData.getPhone());
            existingCustomer.setAddress(newCustomerData.getAddress());
            existingCustomer.setUser(newCustomerData.getUser());
            // createdAt and updatedAt handled automatically
            return customerRepository.save(existingCustomer);
        } else {
            return null;
        }
    }

    @Transactional
    @Override
    public void deleteCustomer(Long id) {
        customerRepository.deleteById(id);
    }

    @Override
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    @Override
    public Page<Customer> getCustomersByFullname(String fullname, Pageable pageable) {
        return customerRepository.findByFullNameContainingIgnoreCase(fullname, pageable);
    }
}
