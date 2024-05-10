package com.AccountRentalHub.repository;

import com.AccountRentalHub.models.AccountRentalPackage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRentalPackageRepository extends JpaRepository<AccountRentalPackage, Long> {
    // You can add custom query methods here if needed
}
