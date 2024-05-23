package com.AccountRentalHub.services;

import com.AccountRentalHub.models.RentalHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface RentalHistoryService {
    List<RentalHistory> getAllRentalHistories();
    RentalHistory getRentalHistoryById(Long id);
    RentalHistory createRentalHistory(RentalHistory rentalHistory);
    RentalHistory updateRentalHistory(Long id, RentalHistory rentalHistory);
    void deleteRentalHistory(Long id);
    Page<RentalHistory> searchRentalHistories(String fullName, String status, Long packageId, Pageable pageable);
    void checkAndMarkOverdueRentals();
}

