package com.AccountRentalHub.repository;

import com.AccountRentalHub.models.AccountRentalPackage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRentalPackageRepository extends JpaRepository<AccountRentalPackage, Long> {
    @Query("SELECT arp FROM AccountRentalPackage arp WHERE " +
            "(:serviceName IS NULL OR arp.accountRentalService.name = :serviceName OR :serviceName = '') " +
            "AND (:name IS NULL OR arp.name LIKE CONCAT('%', :name, '%'))")
    Page<AccountRentalPackage> findByServiceAndServiceName(@Param("serviceName") String serviceName, @Param("name") String name, Pageable pageable);

}
