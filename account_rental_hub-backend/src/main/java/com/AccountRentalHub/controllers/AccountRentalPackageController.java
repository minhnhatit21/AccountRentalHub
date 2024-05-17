package com.AccountRentalHub.controllers;

import com.AccountRentalHub.models.AccountRentalPackage;
import com.AccountRentalHub.models.AccountRentalServices;
import com.AccountRentalHub.payload.response.CustomPageResponse;
import com.AccountRentalHub.services.AccountRentalPackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/accountRentalPackages")
public class AccountRentalPackageController {
    @Autowired
    private AccountRentalPackageService accountRentalPackageService;

    // Tạo mới một AccountRentalPackage
    @PostMapping
    public ResponseEntity<?> createAccountRentalPackage(@RequestBody AccountRentalPackage accountRentalPackage) throws Exception {

        try {
            AccountRentalPackage createdAccountRentalPackage = accountRentalPackageService.createAccountRentalPackage(accountRentalPackage);
            return new ResponseEntity<>(createdAccountRentalPackage, HttpStatus.CREATED);
        } catch (Exception e) {
            // Nếu tên đã tồn tại, trả về thông báo lỗi
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e);
        }
    }

    // Đọc thông tin của một AccountRentalPackage dựa trên id
    @GetMapping("/{id}")
    public ResponseEntity<AccountRentalPackage> getAccountRentalPackageById(@PathVariable Long id) {
        Optional<AccountRentalPackage> accountRentalPackageOptional = accountRentalPackageService.getAccountRentalPackageById(id);
        return accountRentalPackageOptional.map(accountRentalPackage -> new ResponseEntity<>(accountRentalPackage, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AccountRentalPackage> updateAccountRentalPackage(@PathVariable Long id, @RequestBody AccountRentalPackage accountRentalPackage) {
        AccountRentalPackage updateAccountRentalPackage = accountRentalPackageService.updateAccountRentalPackage(id, accountRentalPackage);
        if(updateAccountRentalPackage != null) {
            return new ResponseEntity<>(updateAccountRentalPackage, HttpStatus.OK);
        }   else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Xóa một AccountRentalPackage dựa trên id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAccountRentalPackage(@PathVariable Long id) {
        accountRentalPackageService.deleteAccountRentalPackage(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/list")
    public ResponseEntity<List<AccountRentalPackage>> findAllAccountRentalPackageWithoutPageable() {
        List<AccountRentalPackage> accountRentalPackages = accountRentalPackageService.getAllAccountRentalPackages();
        return  new ResponseEntity<>(accountRentalPackages, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<CustomPageResponse<AccountRentalPackage>> searchAccountRentalServicesByServiceNameAndPage(
            @RequestParam(required = false) Long serviceId,
            @RequestParam(required = false) String name,
            Pageable pageable) {

        Page<AccountRentalPackage> searchResult = accountRentalPackageService.searchAccountRentalPackagesPageable(pageable, serviceId, name);

        if (searchResult.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            CustomPageResponse<AccountRentalPackage> response = new CustomPageResponse<>(
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
