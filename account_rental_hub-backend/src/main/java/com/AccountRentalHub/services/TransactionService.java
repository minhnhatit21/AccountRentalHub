package com.AccountRentalHub.services;

import com.AccountRentalHub.models.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Date;

public interface TransactionService {
    Page<Transaction> searchTransactions(Long userId, String customerName, String status, Date startDate, Date endDate, Pageable pageable);
}
