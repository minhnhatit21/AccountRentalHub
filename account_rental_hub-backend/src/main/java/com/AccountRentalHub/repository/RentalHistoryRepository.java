package com.AccountRentalHub.repository;

import com.AccountRentalHub.models.RentalHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface RentalHistoryRepository extends JpaRepository<RentalHistory, Long> {
    @Query("SELECT rh FROM RentalHistory rh " +
            "JOIN rh.customer c " +
            "JOIN rh.rentalAccount ra " +
            "JOIN ra.accountRentalPackage ap " +
            "WHERE (:fullName IS NULL OR :fullName = '' OR c.fullName LIKE %:fullName%) " +
            "AND (:status IS NULL OR :status = '' OR rh.status = :status) " +
            "AND (:packageId IS NULL OR ap.id = :packageId)")
    Page<RentalHistory> searchRentalHistories(@Param("fullName") String fullName,
                                              @Param("status") String status,
                                              @Param("packageId") Long packageId,
                                              Pageable pageable);

    @Query("SELECT rh FROM RentalHistory rh WHERE rh.endDate < :currentDate AND rh.status <> 'OVERDUE'")
    List<RentalHistory> findAllOverdueRentals(@Param("currentDate") Date currentDate);
}
