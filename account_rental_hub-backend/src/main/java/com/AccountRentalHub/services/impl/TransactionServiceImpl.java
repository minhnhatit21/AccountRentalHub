package com.AccountRentalHub.services.impl;

import com.AccountRentalHub.models.Transaction;
import com.AccountRentalHub.repository.TransactionRepository;
import com.AccountRentalHub.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    TransactionRepository transactionRepository;
    @Override
    public Page<Transaction> searchTransactions(Long userId, String customerName, String status, Date startDate, Date endDate, Pageable pageable) {
        return transactionRepository.searchTransactions(userId, customerName, status, startDate, endDate, pageable);
    }
}
