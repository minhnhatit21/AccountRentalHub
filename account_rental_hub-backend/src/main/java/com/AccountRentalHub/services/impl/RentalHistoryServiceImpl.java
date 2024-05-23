package com.AccountRentalHub.services.impl;

import com.AccountRentalHub.models.AccountRental;
import com.AccountRentalHub.models.Customer;
import com.AccountRentalHub.models.Enum.EAccountRental;
import com.AccountRentalHub.models.Enum.ERentalHistoryStatus;
import com.AccountRentalHub.models.RentalHistory;
import com.AccountRentalHub.repository.AccountRentalRepository;
import com.AccountRentalHub.repository.CustomerRepository;
import com.AccountRentalHub.repository.RentalHistoryRepository;
import com.AccountRentalHub.services.RentalHistoryService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;

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

        if(rentalAccount.getAmountUsers() < 1) {
            rentalAccount.setStatus(EAccountRental.FULL.toString());
        } else {
            rentalAccount.setAmountUsers(rentalAccount.getAmountUsers() - 1);
        }

        accountRentalRepository.save(rentalAccount);

        rentalHistory.setCustomer(customer);
        rentalHistory.setRentalAccount(rentalAccount);
        return rentalHistoryRepository.save(rentalHistory);
    }

    @Transactional
    @Override
    public RentalHistory updateRentalHistory(Long id, RentalHistory rentalHistory) {
        Optional<RentalHistory> optionalRentalHistory = rentalHistoryRepository.findById(id);
        Optional<AccountRental> optionalAccountRental = accountRentalRepository.findById(rentalHistory.getRentalAccount().getId());
        if (optionalRentalHistory.isPresent() && optionalAccountRental.isPresent()) {
            RentalHistory existingRentalHistory = optionalRentalHistory.get();

            existingRentalHistory.setCustomer(rentalHistory.getCustomer());
            existingRentalHistory.setRentalAccount(rentalHistory.getRentalAccount());
            existingRentalHistory.setStartDate(rentalHistory.getStartDate());
            existingRentalHistory.setEndDate(rentalHistory.getEndDate());
            existingRentalHistory.setStatus(rentalHistory.getStatus());
            existingRentalHistory.setCreatedAt(rentalHistory.getCreatedAt());

            AccountRental existingAccountRental = optionalAccountRental.get();

            if(Objects.equals(rentalHistory.getStatus(), EAccountRental.ACTIVE.toString()) && existingAccountRental.getAmountUsers() < 1) {
                existingAccountRental.setStatus(EAccountRental.FULL.toString());
            } else {
                if(Objects.equals(rentalHistory.getStatus(), ERentalHistoryStatus.CANCELLED.toString())) {
                    existingAccountRental.setAmountUsers(existingAccountRental.getAmountUsers() + 1);
                    existingAccountRental.setStatus(EAccountRental.ACTIVE.toString());
                }
            }

            accountRentalRepository.save(existingAccountRental);

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

    @Override
    public void checkAndMarkOverdueRentals() {
        Date currentDate = new Date();
        List<RentalHistory> overdueRentals = rentalHistoryRepository.findAllOverdueRentals(currentDate);

        for (RentalHistory rental : overdueRentals) {
            rental.setStatus(ERentalHistoryStatus.OVERDUE.toString());
            rentalHistoryRepository.save(rental);
        }

    }
}
