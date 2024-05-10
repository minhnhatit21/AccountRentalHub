package com.AccountRentalHub.controllers;

import com.AccountRentalHub.models.AccountRental;
import com.AccountRentalHub.services.AccountRentalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/accountRentals")
public class AccountRentalController {
    @Autowired
    private AccountRentalService accountRentalService;

    // Tạo mới một AccountRental
    @PostMapping
    public ResponseEntity<AccountRental> createAccountRental(@RequestBody AccountRental accountRental) {
        AccountRental createdAccountRental = accountRentalService.createAccountRental(accountRental);
        return new ResponseEntity<>(createdAccountRental, HttpStatus.CREATED);
    }

    // Đọc thông tin của một AccountRental dựa trên id
    @GetMapping("/{id}")
    public ResponseEntity<AccountRental> getAccountRentalById(@PathVariable Long id) {
        Optional<AccountRental> accountRentalOptional = accountRentalService.getAccountRentalById(id);
        if (accountRentalOptional.isPresent()) {
            return new ResponseEntity<>(accountRentalOptional.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Cập nhật thông tin của một AccountRental
    @PutMapping("/{id}")
    public ResponseEntity<AccountRental> updateAccountRental(@PathVariable Long id, @RequestBody AccountRental accountRental) {
        AccountRental updatedAccountRental = accountRentalService.updateAccountRental(id, accountRental);
        if (updatedAccountRental != null) {
            return new ResponseEntity<>(updatedAccountRental, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Xóa một AccountRental dựa trên id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAccountRental(@PathVariable Long id) {
        accountRentalService.deleteAccountRental(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Lấy danh sách tất cả các AccountRental với phân trang
    @GetMapping
    public ResponseEntity<Page<AccountRental>> getAllAccountRentals(Pageable pageable) {
        Page<AccountRental> accountRentals = accountRentalService.getAllAccountRentals(pageable);
        return new ResponseEntity<>(accountRentals, HttpStatus.OK);
    }
}
