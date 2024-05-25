package com.AccountRentalHub.controllers;

import com.AccountRentalHub.models.AccountRental;
import com.AccountRentalHub.payload.response.CustomPageResponse;
import com.AccountRentalHub.services.AccountRentalService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/accountRentals")
public class AccountRentalController {
    @Autowired
    private AccountRentalService accountRentalService;

    // Tạo mới một AccountRental
    @PostMapping
    public ResponseEntity<?> createAccountRental(@RequestBody AccountRental accountRental) {
        try {
            AccountRental createdAccountRental = accountRentalService.createAccountRental(accountRental);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdAccountRental);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error create account rental: " + e.getMessage());
        }
    }

    // Đọc thông tin của một AccountRental dựa trên id
    @GetMapping("/{id}")
    public ResponseEntity<AccountRental> getAccountRentalById(@PathVariable Long id) {
        Optional<AccountRental> accountRentalOptional = accountRentalService.getAccountRentalById(id);
        return accountRentalOptional.map(accountRental -> new ResponseEntity<>(accountRental, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
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

    @GetMapping("/check-availability")
    public ResponseEntity<Map<String, Object>> checkAccountRentalAvailability(
            @RequestParam Long packageId,
            @RequestParam String status,
            @RequestParam int packageAmount,
            @RequestParam int rentalAmount) {

        boolean isAvailable = accountRentalService.checkAccountRentalAvailability(packageId, status, packageAmount, rentalAmount);

        Map<String, Object> response = new HashMap<>();
        response.put("isAvailable", isAvailable);
        response.put("message", isAvailable ? "Account rental is available" : "Account rental not found or out of stock");

        return ResponseEntity.ok(response);
    }

    // Lấy danh sách tất cả các AccountRental với phân trang
    @GetMapping
    public ResponseEntity<Page<AccountRental>> getAllAccountRentals(Pageable pageable) {
        Page<AccountRental> accountRentals = accountRentalService.getAllAccountRentals(pageable);
        return new ResponseEntity<>(accountRentals, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<CustomPageResponse<AccountRental>> searchAccountRentals(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String username,
            @RequestParam(required = false) Long packageId,
            Pageable pageable) {

        Page<AccountRental> searchResult = accountRentalService.getAllAccountRentalsPageable(pageable, status, packageId, username);

        if (searchResult.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            CustomPageResponse<AccountRental> response = new CustomPageResponse<>(
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
