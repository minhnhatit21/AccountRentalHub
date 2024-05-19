package com.AccountRentalHub.services.impl;

import com.AccountRentalHub.models.AccountRental;
import com.AccountRentalHub.models.Customer;
import com.AccountRentalHub.models.RentalHistory;
import com.AccountRentalHub.repository.AccountRentalRepository;
import com.AccountRentalHub.repository.CustomerRepository;
import com.AccountRentalHub.repository.RentalHistoryRepository;
import com.AccountRentalHub.services.RentalHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
@Service
public class RentalHistoryServiceImpl implements RentalHistoryService {

    @Autowired
    private RentalHistoryRepository rentalHistoryRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private AccountRentalRepository accountRentalRepository;


    @Override
    public List<RentalHistory> getAllRentalHistories() {
        return rentalHistoryRepository.findAll();
    }

    @Override
    public RentalHistory getRentalHistoryById(Long id) {
        Optional<RentalHistory> optionalRentalHistory = rentalHistoryRepository.findById(id);
        return optionalRentalHistory.orElse(null);
    }


    @Override
    public RentalHistory createRentalHistory(RentalHistory rentalHistory) {
        Long customerId = rentalHistory.getCustomer().getId();
        Long rentalAccountId = rentalHistory.getRentalAccount().getId();

        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new NoSuchElementException("Customer not found with id: " + customerId));
        AccountRental rentalAccount = accountRentalRepository.findById(rentalAccountId)
                .orElseThrow(() -> new NoSuchElementException("RentalAccount not found with id: " + rentalAccountId));

        rentalHistory.setCustomer(customer);
        rentalHistory.setRentalAccount(rentalAccount);
//        rentalHistory.setCreatedAt(new Date());
//        rentalHistory.setUpdatedAt(new Date());
        return rentalHistoryRepository.save(rentalHistory);
    }

    @Override
    public RentalHistory updateRentalHistory(Long id, RentalHistory rentalHistory) {
        Optional<RentalHistory> optionalRentalHistory = rentalHistoryRepository.findById(id);
        if (optionalRentalHistory.isPresent()) {
            RentalHistory existingRentalHistory = optionalRentalHistory.get();
            existingRentalHistory.setCustomer(rentalHistory.getCustomer());
            existingRentalHistory.setRentalAccount(rentalHistory.getRentalAccount());
            existingRentalHistory.setStartDate(rentalHistory.getStartDate());
            existingRentalHistory.setEndDate(rentalHistory.getEndDate());
            existingRentalHistory.setStatus(rentalHistory.getStatus());
            existingRentalHistory.setCreatedAt(rentalHistory.getCreatedAt());
            return rentalHistoryRepository.save(existingRentalHistory);
        } else {
            return null;
        }
    }

    @Override
    public void deleteRentalHistory(Long id) {
        rentalHistoryRepository.deleteById(id);
    }

    @Override
    public Page<RentalHistory> searchRentalHistories(String fullName, String status, Long packageId, Pageable pageable) {
        return rentalHistoryRepository.searchRentalHistories(fullName, status, packageId, pageable);
    }
}
