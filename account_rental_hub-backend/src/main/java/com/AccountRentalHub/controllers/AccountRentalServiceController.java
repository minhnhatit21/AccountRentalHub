package com.AccountRentalHub.controllers;

import com.AccountRentalHub.models.AccountRentalServices;
import com.AccountRentalHub.payload.response.CustomPageResponse;
import com.AccountRentalHub.payload.response.ServiceResponse;
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

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/accountRentalServices")
public class AccountRentalServiceController {
    @Autowired
    private AccountRentalServiceService accountRentalServiceService;

    // Tạo mới một AccountRentalService
    @PostMapping
    public ResponseEntity<?> createAccountRentalService(@RequestBody AccountRentalServices accountRentalService) {
        try {
            AccountRentalServices createdAccountRentalService = accountRentalServiceService.createAccountRentalService(accountRentalService);
            return new ResponseEntity<>(createdAccountRentalService, HttpStatus.CREATED);
        } catch (Exception e) {
            // Nếu tên đã tồn tại, trả về thông báo lỗi
            String errorMessage = "Tên đã tồn tại: " + accountRentalService.getName();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
        }
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
            String errorMessage = "Không tìm thấy";
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
    public ResponseEntity<CustomPageResponse<AccountRentalServices>> getAllAccountRentalServices(Pageable pageable) {
        Page<AccountRentalServices> accountRentalServices = accountRentalServiceService.getAllAccountRentalServices(pageable);
        CustomPageResponse<AccountRentalServices> response = new CustomPageResponse<>(
                accountRentalServices.getContent(),
                accountRentalServices.getNumber(),
                accountRentalServices.getSize(),
                accountRentalServices.getTotalElements(),
                accountRentalServices.getTotalPages()
        );
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity<List<AccountRentalServices>> getAllServices() {
        List<AccountRentalServices> services = accountRentalServiceService.getAllServiceResponses();
        return new ResponseEntity<>(services, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<CustomPageResponse<AccountRentalServices>> searchAccountRentalServicesByCategoryAndPage(@RequestParam(required = false) String cat, @RequestParam(required = false) String name, Pageable pageable) {
        Page<AccountRentalServices> searchResult = accountRentalServiceService.searchAccountRentalServicesByCategoryAndNamePageable(pageable, cat, name);
        if (searchResult.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            CustomPageResponse<AccountRentalServices> response = new CustomPageResponse<>(
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
