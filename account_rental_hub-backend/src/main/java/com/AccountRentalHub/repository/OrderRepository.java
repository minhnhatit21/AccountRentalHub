package com.AccountRentalHub.repository;

import com.AccountRentalHub.models.AccountRental;
import com.AccountRentalHub.models.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query("SELECT o FROM Order o WHERE " +
            "(:orderCode IS NULL OR :orderCode = '' OR o.orderCode LIKE %:orderCode%) AND " +
            "(:userId IS NULL OR o.customer.user.id = :userId) AND " +
            "(:startDate IS NULL OR o.orderDate >= :startDate) AND " +
            "(:endDate IS NULL OR o.orderDate <= :endDate) AND " +
            "(:status IS NULL OR :status = '' OR o.status = :status)")
    Page<Order> findOrdersByCriteria(@Param("orderCode") String orderCode,
                                     @Param("userId") Long userId,
                                     @Param("startDate") Date startDate,
                                     @Param("endDate") Date endDate,
                                     @Param("status") String status,
                                     Pageable pageable);

    Optional<Order> findByOrderCode(String orderCode);
}