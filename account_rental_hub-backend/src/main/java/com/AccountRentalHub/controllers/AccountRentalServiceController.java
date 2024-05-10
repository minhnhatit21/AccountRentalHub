package com.AccountRentalHub.controllers;

import com.AccountRentalHub.models.AccountRentalServices;
import com.AccountRentalHub.services.AccountRentalServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/accountRentalServices")
public class AccountRentalServiceController {
    @Autowired
    private AccountRentalServiceService accountRentalServiceService;

    // Tạo mới một AccountRentalService
    @PostMapping
    public ResponseEntity<AccountRentalServices> createAccountRentalService(@RequestBody AccountRentalServices accountRentalService) {
        AccountRentalServices createdAccountRentalService = accountRentalServiceService.createAccountRentalService(accountRentalService);
        return new ResponseEntity<>(createdAccountRentalService, HttpStatus.CREATED);
    }

    // Đọc thông tin của một AccountRentalService dựa trên id
    @GetMapping("/{id}")
    public ResponseEntity<AccountRentalServices> getAccountRentalServiceById(@PathVariable Long id) {
        Optional<AccountRentalServices> accountRentalServiceOptional = accountRentalServiceService.getAccountRentalServiceById(id);
        if (accountRentalServiceOptional.isPresent()) {
            return new ResponseEntity<>(accountRentalServiceOptional.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Cập nhật thông tin của một AccountRentalService
    @PutMapping("/{id}")
    public ResponseEntity<AccountRentalServices> updateAccountRentalService(@PathVariable Long id, @RequestBody AccountRentalServices accountRentalService) {
        AccountRentalServices updatedAccountRentalService = accountRentalServiceService.updateAccountRentalService(id, accountRentalService);
        if (updatedAccountRentalService != null) {
            return new ResponseEntity<>(updatedAccountRentalService, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Xóa một AccountRentalService dựa trên id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAccountRentalService(@PathVariable Long id) {
        accountRentalServiceService.deleteAccountRentalService(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Lấy danh sách tất cả các AccountRentalService với phân trang
    @GetMapping
    public ResponseEntity<Page<AccountRentalServices>> getAllAccountRentalServices(Pageable pageable) {
        Page<AccountRentalServices> accountRentalServices = accountRentalServiceService.getAllAccountRentalServices(pageable);
        return new ResponseEntity<>(accountRentalServices, HttpStatus.OK);
    }
}
