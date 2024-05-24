package com.AccountRentalHub.controllers;

import com.AccountRentalHub.models.Customer;
import com.AccountRentalHub.models.Transaction;
import com.AccountRentalHub.payload.response.CustomPageResponse;
import com.AccountRentalHub.payload.response.TransactionResponse;
import com.AccountRentalHub.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/transaction")
public class TransactionController {

    @Autowired
    TransactionService transactionService;
    @GetMapping("/search")
    public ResponseEntity<CustomPageResponse<TransactionResponse>> searchTransaction(
            @RequestParam(required = false) Long userId,
            @RequestParam(required = false) String customerName,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date endDate,
            Pageable pageable) {

        Page<Transaction> searchResult = transactionService.searchTransactions(userId, customerName, status, startDate, endDate, pageable);

        if (searchResult.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            CustomPageResponse<TransactionResponse> response = new CustomPageResponse<>(
                    searchResult.getContent().stream().map(this::convertToTransactionResponse).collect(Collectors.toList()),
                    searchResult.getNumber(),
                    searchResult.getSize(),
                    searchResult.getTotalElements(),
                    searchResult.getTotalPages()
            );
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }

    private TransactionResponse convertToTransactionResponse(Transaction transaction) {
        TransactionResponse response = new TransactionResponse();
        response.setId(transaction.getId());
        response.setOrderId(transaction.getOrder().getId());
        response.setOrderCode(transaction.getOrder().getOrderCode());
        response.setCustomerName(transaction.getCustomer().getFullname());
        response.setTransactionDate(transaction.getTransactionDate());
        response.setAmount(transaction.getAmount());
        response.setPaymentMethod(transaction.getPaymentMethod());
        response.setStatus(transaction.getStatus());
        return response;
    }
}
