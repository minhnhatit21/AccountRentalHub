package com.AccountRentalHub.services.impl;

import com.AccountRentalHub.models.AccountRental;
import com.AccountRentalHub.models.AccountRentalPackage;
import com.AccountRentalHub.models.Enum.EAccountRental;
import com.AccountRentalHub.models.Enum.ERentalHistoryStatus;
import com.AccountRentalHub.models.RentalHistory;
import com.AccountRentalHub.repository.AccountRentalPackageRepository;
import com.AccountRentalHub.repository.AccountRentalRepository;
import com.AccountRentalHub.services.AccountRentalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class AccountRentalServiceImpl implements AccountRentalService {

    @Autowired
    private AccountRentalRepository accountRentalRepository;

    @Autowired
    private AccountRentalPackageRepository accountRentalPackageRepository;
    @Transactional
    @Override
    public AccountRental createAccountRental(AccountRental accountRental) {
        Optional<AccountRentalPackage> optionalAccountRentalPackage = accountRentalPackageRepository.findById(accountRental.getAccountRentalPackage().getId());
        if (optionalAccountRentalPackage.isPresent()) {
            AccountRentalPackage accountRentalPackage = optionalAccountRentalPackage.get();
            if (accountRentalPackage.getAmount() > 0) {
                accountRentalPackage.setAmount(accountRentalPackage.getAmount() - 1);
            } else {
                throw new IllegalStateException("Account rental package amount must be greater than 0");
            }
        } else {
            throw new IllegalArgumentException("Account rental package not found");
        }
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

    @Override
    public void checkAndMarkExpiredAccountRentals() {
        Date currentDate = new Date();
        List<AccountRental> overdueRentals = accountRentalRepository.findAllExpiredAccountRentals(currentDate);

        for (AccountRental rental : overdueRentals) {
            rental.setStatus(EAccountRental.EXPIRED.toString());
            accountRentalRepository.save(rental);
        }
    }

}
