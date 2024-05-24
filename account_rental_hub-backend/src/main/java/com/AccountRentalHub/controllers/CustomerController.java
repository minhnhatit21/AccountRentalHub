package com.AccountRentalHub.controllers;

import com.AccountRentalHub.models.Customer;
import com.AccountRentalHub.payload.response.CustomPageResponse;
import com.AccountRentalHub.services.impl.CustomerServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/customer")
public class CustomerController {
    @Autowired
    private CustomerServiceImpl customerService;

    // Tạo mới một Customer
    @PostMapping
    public ResponseEntity<Customer> createCustomer(@RequestBody Customer customer) {
        Customer createdCustomer = customerService.createCustomer(customer);
        return new ResponseEntity<>(createdCustomer, HttpStatus.CREATED);
    }

    // Đọc thông tin của một Customer dựa trên id
    @GetMapping("/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable Long id) {
        Optional<Customer> customerOptional = customerService.getCustomerById(id);
        return customerOptional.map(customer -> new ResponseEntity<>(customer, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/user/{userid}")
    public ResponseEntity<Customer> getCustomerByUserId(@PathVariable Long userid) {
        Optional<Customer> customerOptional = customerService.getCustomerByUserId(userid);
        return customerOptional.map(customer -> new ResponseEntity<>(customer, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Cập nhật thông tin của một Customer
    @PutMapping("/{id}")
    public ResponseEntity<Customer> updateCustomer(@PathVariable Long id, @RequestBody Customer customer) {
        Customer updatedCustomer = customerService.updateCustomer(id, customer);
        if (updatedCustomer != null) {
            return new ResponseEntity<>(updatedCustomer, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Xóa một Customer dựa trên id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Long id) {
        customerService.deleteCustomer(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Lấy danh sách tất cả các Customer
    @GetMapping
    public ResponseEntity<List<Customer>> getAllCustomers() {
        List<Customer> customers = customerService.getAllCustomers();
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<CustomPageResponse<Customer>> searchCustomers(
            @RequestParam(required = false) String fullname,
            Pageable pageable) {

        Page<Customer> searchResult = customerService.getCustomersByFullname(fullname, pageable);

        if (searchResult.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            CustomPageResponse<Customer> response = new CustomPageResponse<>(
                    searchResult.getContent(),
                    searchResult.getNumber(),
                    searchResult.getSize(),
                    searchResult.getTotalElements(),
                    searchResult.getTotalPages()
            );
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }
}
