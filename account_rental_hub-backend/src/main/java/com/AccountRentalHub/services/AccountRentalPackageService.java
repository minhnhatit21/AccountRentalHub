package com.AccountRentalHub.services;

import com.AccountRentalHub.models.AccountRental;
import com.AccountRentalHub.models.AccountRentalPackage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface AccountRentalPackageService {
    /**
     * Create new AccountRentalPackage
     * @param accountRentalPackage
     * @return AccountRentalPackage
     */
    AccountRentalPackage createAccountRentalPackage(AccountRentalPackage accountRentalPackage);

    /**
     * Get AccountRentalPackage by ID
     * @param id
     * @return Optional<AccountRentalPackage>
     */
    Optional<AccountRentalPackage> getAccountRentalPackageById(Long id);

    /**
     * Update AccountRental bu ID
     * @param id
     * @param newAccountRentalPackageData
     * @return
     */
    AccountRentalPackage updateAccountRentalPackage(Long id, AccountRentalPackage newAccountRentalPackageData);

    /**
     * Delete a AccountRentalPackage by Id
     * @param id
     */
    void deleteAccountRentalPackage(Long id);

    /**
     * Get list AccountRentalPackages with pagination
     * @param pageable
     * @return
     */
    Page<AccountRentalPackage> getAllAccountRentalPackages(Pageable pageable);
}
