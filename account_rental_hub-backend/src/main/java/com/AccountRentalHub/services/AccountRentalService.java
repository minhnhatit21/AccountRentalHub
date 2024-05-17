package com.AccountRentalHub.services;

import com.AccountRentalHub.models.AccountRental;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface AccountRentalService {
    AccountRental createAccountRental(AccountRental accountRental);
    Optional<AccountRental> getAccountRentalById(Long id);
    AccountRental updateAccountRental(Long id, AccountRental newAccountRentalData);
    void deleteAccountRental(Long id);
    Page<AccountRental> getAllAccountRentals(Pageable pageable);
    Page<AccountRental> getAllAccountRentalsPageable(Pageable pageable, String status, Long packageID, String username);
}
