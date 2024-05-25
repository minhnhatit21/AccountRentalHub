package com.AccountRentalHub.repository;

import com.AccountRentalHub.models.Cart;
import com.AccountRentalHub.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    Cart findByUser(User user);

    Optional<Cart> findByUserId(Long userId);
}
