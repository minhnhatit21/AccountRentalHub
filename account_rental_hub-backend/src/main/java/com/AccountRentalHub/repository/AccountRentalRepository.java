package com.AccountRentalHub.repository;

import com.AccountRentalHub.models.AccountRental;
import com.AccountRentalHub.models.RentalHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

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


    @Query("SELECT ar FROM AccountRental ar WHERE ar.renewEndDate < :currentDate AND ar.status <> 'EXPIRED'")
    List<AccountRental> findAllExpiredAccountRentals(@Param("currentDate") Date currentDate);

    @Query("SELECT ar FROM AccountRental ar " +
            "WHERE ar.accountRentalPackage.id = :packageId " +
            "AND ar.status = :status " +
            "AND ar.accountRentalPackage.amount > :amount AND ar.amountUsers > :accountRentalAmount")
    List<AccountRental> findFirstByPackageIdAndStatusAndAmountGreaterThan(@Param("packageId") Long packageId,
                                                                          @Param("status") String status,
                                                                          @Param("amount") int amount,  @Param("accountRentalAmount") int accountRentalAmount);
    @Query(value = "SELECT ar.* " +
            "FROM account_rental ar " +
            "JOIN account_rental_package arp ON ar.account_rental_package_id = arp.id " +
            "WHERE arp.id = :packageId AND ar.account_rental_status = :status AND arp.amount > :packageAmount AND ar.amount_user > :rentalAmount " +
            "ORDER BY ar.id ASC " +
            "LIMIT 1", nativeQuery = true)
    Optional<AccountRental> findFirstByPackageIdAndStatusAndAmountsGreaterThan(
            @Param("packageId") Long packageId,
            @Param("status") String status,
            @Param("packageAmount") int packageAmount,
            @Param("rentalAmount") int rentalAmount);
}