package com.AccountRentalHub.repository;

import com.AccountRentalHub.models.AccountRental;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRentalRepository extends JpaRepository<AccountRental, Long> {
    @Query("SELECT ar FROM AccountRental ar WHERE " +
            "(:status IS NULL OR ar.status = :status OR :status = '') " +
            "AND (:username IS NULL OR :username = '' OR ar.username = :username) " +
            "AND (:packageId IS NULL OR ar.accountRentalPackage.id = :packageId)")
    Page<AccountRental> findByStatusUsernameAndPackageId(
            @Param("status") String status,
            @Param("username") String username,
            @Param("packageId") Long packageId,
            Pageable pageable);
}
