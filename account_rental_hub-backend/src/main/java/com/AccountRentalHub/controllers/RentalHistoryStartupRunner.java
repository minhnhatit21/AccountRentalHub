package com.AccountRentalHub.controllers;

import com.AccountRentalHub.services.AccountRentalService;
import com.AccountRentalHub.services.RentalHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class RentalHistoryStartupRunner implements ApplicationRunner {

    @Autowired
    RentalHistoryService rentalHistoryService;

    @Autowired
    AccountRentalService accountRentalService;
    @Override
    public void run(ApplicationArguments args) throws Exception {
        rentalHistoryService.checkAndMarkOverdueRentals();
        accountRentalService.checkAndMarkExpiredAccountRentals();
    }
}
