package com.AccountRentalHub.controllers;

import com.AccountRentalHub.models.Customer;
import com.AccountRentalHub.models.RentalHistory;
import com.AccountRentalHub.payload.response.CustomPageResponse;
import com.AccountRentalHub.services.RentalHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/rentalHistories")
public class RentalHistoryController {

    private final RentalHistoryService rentalHistoryService;

    @Autowired
    public RentalHistoryController(RentalHistoryService rentalHistoryService) {
        this.rentalHistoryService = rentalHistoryService;
    }

    @GetMapping
    public List<RentalHistory> getAllRentalHistories() {
        return rentalHistoryService.getAllRentalHistories();
    }

    @GetMapping("/{id}")
    public ResponseEntity<RentalHistory> getRentalHistoryById(@PathVariable Long id) {
        RentalHistory rentalHistory = rentalHistoryService.getRentalHistoryById(id);
        if (rentalHistory != null) {
            return ResponseEntity.ok(rentalHistory);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<?> createRentalHistory(@RequestBody RentalHistory rentalHistory) {
        try {
            RentalHistory createdRentalHistory = rentalHistoryService.createRentalHistory(rentalHistory);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdRentalHistory);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<RentalHistory> updateRentalHistory(@PathVariable Long id, @RequestBody RentalHistory rentalHistory) {
        RentalHistory updatedRentalHistory = rentalHistoryService.updateRentalHistory(id, rentalHistory);
        if (updatedRentalHistory != null) {
            return ResponseEntity.ok(updatedRentalHistory);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRentalHistory(@PathVariable Long id) {
        rentalHistoryService.deleteRentalHistory(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<CustomPageResponse<RentalHistory>> searchRentalHistories(
            @RequestParam(required = false) String fullName,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) Long packageId,
            Pageable pageable) {

        Page<RentalHistory> searchResult = rentalHistoryService.searchRentalHistories(fullName, status, packageId, pageable);

        if (searchResult.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            CustomPageResponse<RentalHistory> response = new CustomPageResponse<>(
                    searchResult.getContent(),
                    searchResult.getNumber(),
                    searchResult.getSize(),
                    searchResult.getTotalElements(),
                    searchResult.getTotalPages()
            );
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<String> handleNoSuchElementException(NoSuchElementException ex, WebRequest request) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }
}

