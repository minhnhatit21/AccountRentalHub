package com.AccountRentalHub.services.impl;

import com.AccountRentalHub.models.AccountRental;
import com.AccountRentalHub.repository.AccountRentalRepository;
import com.AccountRentalHub.services.AccountRentalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    @Transactional
    public AccountRental updateAccountRental(Long id, AccountRental newAccountRentalData) {
        Optional<AccountRental> existingAccountRentalOptional = accountRentalRepository.findById(id);
        if (existingAccountRentalOptional.isPresent()) {
            AccountRental existingAccountRental = existingAccountRentalOptional.get();

            // Update fields with new data
            existingAccountRental.setUsername(newAccountRentalData.getUsername());
            existingAccountRental.setEmail(newAccountRentalData.getEmail());
            existingAccountRental.setPassword(newAccountRentalData.getPassword());
            existingAccountRental.setStatus(newAccountRentalData.getStatus());
            existingAccountRental.setRenewStartDate(newAccountRentalData.getRenewStartDate());
            existingAccountRental.setRenewEndDate(newAccountRentalData.getRenewEndDate());
            existingAccountRental.setAccountRentalPackage(newAccountRentalData.getAccountRentalPackage());

            return accountRentalRepository.save(existingAccountRental);
        } else {
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

    @Override
    public Page<AccountRental> getAllAccountRentalsPageable(Pageable pageable, String status, Long packageID, String username) {
        return accountRentalRepository.findByStatusUsernameAndPackageId(status,username,packageID,pageable);
    }

}
