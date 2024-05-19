package com.AccountRentalHub.services;

import com.AccountRentalHub.models.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface CustomerService {
    /**
     *
     * @param customer
     * @return
     */
    Customer createCustomer(Customer customer);

    /**
     *
     * @param id
     * @return
     */
    Optional<Customer> getCustomerById(Long id);

    /**
     *
     * @param id
     * @return
     */
    Optional<Customer> getCustomerByUserId(Long id);

    /**
     *
     * @param id
     * @param newCustomerData
     * @return
     */
    Customer updateCustomer(Long id, Customer newCustomerData);

    /**
     *
     * @param id
     */
    void deleteCustomer(Long id);

    /**
     *
     * @return
     */
    List<Customer> getAllCustomers();

    /**
     *
     * @param fullname
     * @param pageable
     * @return
     */
    Page<Customer> getCustomersByFullname(String fullname, Pageable pageable);
}
