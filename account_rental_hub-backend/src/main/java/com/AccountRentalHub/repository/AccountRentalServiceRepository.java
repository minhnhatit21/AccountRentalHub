package com.AccountRentalHub.repository;

import com.AccountRentalHub.models.AccountRentalServices;
import com.AccountRentalHub.payload.response.ServiceResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountRentalServiceRepository extends JpaRepository<AccountRentalServices, Long> {
    @Query("SELECT ars FROM AccountRentalServices ars WHERE (:category IS NULL OR ars.category = :category OR :category = '')")
    List<AccountRentalServices> findByCategory(String category);

    @Query("SELECT ars FROM AccountRentalServices ars WHERE (:category IS NULL OR ars.category = :category OR :category = '')")
    Page<AccountRentalServices> findByCategory(String category, Pageable pageable);
    @Query("SELECT ars FROM AccountRentalServices ars WHERE " +
            "(:category IS NULL OR ars.category = :category OR :category = '') " +
            "AND (:name IS NULL OR ars.name LIKE CONCAT('%', :name, '%'))")
    Page<AccountRentalServices> findByCategoryAndName(@Param("category") String category, @Param("name") String name, Pageable pageable);

    @Query("SELECT ars FROM AccountRentalServices ars ORDER BY ars.name ASC")
    List<AccountRentalServices> findAllServiceResponses();
    Boolean existsByName(String name);
}
