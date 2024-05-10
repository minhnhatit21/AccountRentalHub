package com.AccountRentalHub.repository;

import com.AccountRentalHub.models.AccountRental;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRentalRepository extends JpaRepository<AccountRental, Long> {
    // You can add custom query methods here if needed
}
