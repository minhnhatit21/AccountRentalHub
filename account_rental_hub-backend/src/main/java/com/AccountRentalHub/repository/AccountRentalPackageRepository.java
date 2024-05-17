package com.AccountRentalHub.repository;

import com.AccountRentalHub.models.AccountRentalPackage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountRentalPackageRepository extends JpaRepository<AccountRentalPackage, Long> {
    @Query("SELECT arp FROM AccountRentalPackage arp WHERE " +
            "(:serviceId IS NULL OR arp.accountRentalServices.id = :serviceId) " +
            "AND (:name IS NULL OR arp.name LIKE CONCAT('%', :name, '%'))")
    Page<AccountRentalPackage> findByServiceIDAndPackageName(@Param("serviceId") Long serviceId, @Param("name") String name, Pageable pageable);
    Boolean existsByName(String name);

    @Query("SELECT s FROM AccountRentalPackage s ORDER BY s.name ASC")
    List<AccountRentalPackage> findAllAccountRentalPackages();
}
