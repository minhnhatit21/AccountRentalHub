package com.AccountRentalHub.services;

import com.AccountRentalHub.models.AccountRentalServices;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface AccountRentalServiceService {
    Optional<AccountRentalServices> getAccountRentalServiceById(Long id);
    AccountRentalServices createAccountRentalService(AccountRentalServices accountRentalService);
    AccountRentalServices updateAccountRentalService(Long id, AccountRentalServices newAccountRentalServiceData);
    void deleteAccountRentalService(Long id);
    Page<AccountRentalServices> getAllAccountRentalServices(Pageable pageable);
}
