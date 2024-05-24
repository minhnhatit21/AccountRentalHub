package com.AccountRentalHub.repository;

import com.AccountRentalHub.models.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    @Query("SELECT t FROM Transaction t " +
            "JOIN t.customer c " +
            "WHERE (:userId IS NULL OR c.user.id = :userId) AND " +
            "(:customerName IS NULL OR :customerName = '' OR LOWER(c.fullName) LIKE LOWER(CONCAT('%', :customerName, '%'))) AND " +
            "(:status IS NULL OR :status = '' OR t.status = :status) AND " +
            "(:startDate IS NULL OR t.transactionDate >= :startDate) AND " +
            "(:endDate IS NULL OR t.transactionDate <= :endDate)")
    Page<Transaction> searchTransactions(
            @Param("userId") Long userId,
            @Param("customerName") String customerName,
            @Param("status") String status,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            Pageable pageable);
}
