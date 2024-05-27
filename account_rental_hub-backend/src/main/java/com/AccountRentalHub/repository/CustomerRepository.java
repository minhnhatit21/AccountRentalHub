package com.AccountRentalHub.repository;

import com.AccountRentalHub.models.AccountRental;
import com.AccountRentalHub.models.Customer;
import com.AccountRentalHub.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Page<Customer> findByFullNameContainingIgnoreCase(String fullname, Pageable pageable);

    Customer findByUser(User user);

    @Query("SELECT c FROM Customer c WHERE c.user.id = :id")
    Optional<Customer> findByUserId(Long id);
}
