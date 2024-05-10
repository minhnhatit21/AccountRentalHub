package com.AccountRentalHub.repository;

import com.AccountRentalHub.models.AccountRentalServices;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface AccountRentalServiceRepository extends JpaRepository<AccountRentalServices, Long> {
    // You can add custom query methods here if needed
}
