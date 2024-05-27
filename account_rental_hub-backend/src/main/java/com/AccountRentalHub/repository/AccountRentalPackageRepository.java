package com.AccountRentalHub.repository;

import com.AccountRentalHub.models.AccountRentalPackage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRentalPackageRepository extends JpaRepository<AccountRentalPackage, Long> {
    @Query("SELECT arp FROM AccountRentalPackage arp WHERE " +
            "(:serviceId IS NULL OR arp.accountRentalServices.id = :serviceId) " +
            "AND (:name IS NULL OR arp.name LIKE CONCAT('%', :name, '%'))" +
            "AND (:category IS NULL OR arp.accountRentalServices.category = :category)")
    Page<AccountRentalPackage> findByServiceIDAndPackageName(@Param("serviceId") Long serviceId, @Param("name") String name, @Param("category") String category, Pageable pageable);

    @Query("SELECT arp FROM AccountRentalPackage arp WHERE " +
            "(:serviceId IS NULL OR arp.accountRentalServices.id = :serviceId) " +
            "AND (:name IS NULL OR arp.name LIKE CONCAT('%', :name, '%')) " +
            "AND (:category IS NULL OR :category = '' OR arp.accountRentalServices.category = :category) " +
            "AND (:minPrice IS NULL OR arp.discountedPrice >= :minPrice) " +
            "AND (:maxPrice IS NULL OR arp.discountedPrice <= :maxPrice) " +
            "AND (:serviceName IS NULL OR arp.accountRentalServices.name LIKE CONCAT('%', :serviceName, '%'))")
    Page<AccountRentalPackage> findByFilters(
            @Param("serviceId") Long serviceId,
            @Param("name") String name,
            @Param("category") String category,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice,
            @Param("serviceName") String serviceName,
            Pageable pageable);

    Boolean existsByName(String name);

    @Query("SELECT s FROM AccountRentalPackage s ORDER BY s.name ASC")
    List<AccountRentalPackage> findAllAccountRentalPackages();

    @Query("SELECT arp FROM AccountRentalPackage arp WHERE " +
            "(:serviceId IS NULL OR arp.accountRentalServices.id = :serviceId)")
    List<AccountRentalPackage> findAllAccountRentalPackagesByServiceId(@Param("serviceId") Long serviceId);
}
