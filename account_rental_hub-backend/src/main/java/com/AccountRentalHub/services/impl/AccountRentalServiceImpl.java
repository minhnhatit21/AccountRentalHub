package com.AccountRentalHub.services.impl;

import com.AccountRentalHub.models.AccountRental;
import com.AccountRentalHub.repository.AccountRentalRepository;
import com.AccountRentalHub.services.AccountRentalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccountRentalServiceImpl implements AccountRentalService {

    @Autowired
    private AccountRentalRepository accountRentalRepository;
    @Override
    public AccountRental createAccountRental(AccountRental accountRental) {
        return accountRentalRepository.save(accountRental);
    }

    @Override
    public Optional<AccountRental> getAccountRentalById(Long id) {
        return accountRentalRepository.findById(id);
    }

    @Override
    public AccountRental updateAccountRental(Long id, AccountRental newAccountRentalData) {
        Optional<AccountRental> existingAccountRentalOptional = accountRentalRepository.findById(id);
        if (existingAccountRentalOptional.isPresent()) {
            AccountRental existingAccountRental = existingAccountRentalOptional.get();
            // Cập nhật các trường mới
            existingAccountRental.setUsername(newAccountRentalData.getUsername());
            existingAccountRental.setEmail(newAccountRentalData.getEmail());
            existingAccountRental.setPassword(newAccountRentalData.getPassword());
            existingAccountRental.setStatus(newAccountRentalData.getStatus());
            return accountRentalRepository.save(existingAccountRental);
        } else {
            // Xử lý khi không tìm thấy AccountRental
            return null;
        }
    }

    @Override
    public void deleteAccountRental(Long id) {
        accountRentalRepository.deleteById(id);
    }

    @Override
    public Page<AccountRental> getAllAccountRentals(Pageable pageable) {
        return accountRentalRepository.findAll(pageable);
    }
}
