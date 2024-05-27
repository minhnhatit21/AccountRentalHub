package com.AccountRentalHub.services;

import com.AccountRentalHub.models.AccountRental;
import com.AccountRentalHub.models.AccountRentalPackage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface AccountRentalPackageService {
    /**
     * Create new AccountRentalPackage
     * @param accountRentalPackage
     * @return AccountRentalPackage
     */
    AccountRentalPackage createAccountRentalPackage(AccountRentalPackage accountRentalPackage) throws Exception;

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
    AccountRentalPackage updateAccountRentalPackage(Long id, AccountRentalPackage newAccountRentalPackageData) throws Exception;

    /**
     * Delete a AccountRentalPackage by Id
     * @param id
     */
    void deleteAccountRentalPackage(Long id);

    /**
     * Get all list AccountRentalPackages without pagination
     * @return
     */
    List<AccountRentalPackage> getAllAccountRentalPackages();

    /**
     * Get all list AccountRentalPackages by Service ID without pagination
     * @return
     */
    List<AccountRentalPackage> getAllAccountRentalPackagesByServiceID(Long serviceId);

    /**
     * Get list AccountRentalPackages with pagination
     * @param pageable
     * @return
     */
    Page<AccountRentalPackage> getAllAccountRentalPackages(Pageable pageable);

    /**
     * Search list AccountRentalPackage with service name and account package name
     */
    Page<AccountRentalPackage> searchAccountRentalPackagesPageable(Pageable pageable, Long serviceId, String name, String category,Double minPrice, Double maxPrice,String serviceName);
}
