package com.AccountRentalHub.services.impl;

import com.AccountRentalHub.models.AccountRentalPackage;
import com.AccountRentalHub.repository.AccountRentalPackageRepository;
import com.AccountRentalHub.services.AccountRentalPackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccountRentalPackageServiceImpl implements AccountRentalPackageService {

    @Autowired
    private AccountRentalPackageRepository accountRentalPackageRepository;
    @Override
    public AccountRentalPackage createAccountRentalPackage(AccountRentalPackage accountRentalPackage) {
        return accountRentalPackageRepository.save(accountRentalPackage);
    }

    @Override
    public Optional<AccountRentalPackage> getAccountRentalPackageById(Long id) {
        return accountRentalPackageRepository.findById(id);
    }

    @Override
    public AccountRentalPackage updateAccountRentalPackage(Long id, AccountRentalPackage newAccountRentalPackageData) {
        Optional<AccountRentalPackage> existingAccountRentalPackageOptional = accountRentalPackageRepository.findById(id);
        if (existingAccountRentalPackageOptional.isPresent()) {
            AccountRentalPackage existingAccountRentalPackage = existingAccountRentalPackageOptional.get();
            existingAccountRentalPackage.setName(newAccountRentalPackageData.getName());
            existingAccountRentalPackage.setDuration(newAccountRentalPackageData.getDuration());
            existingAccountRentalPackage.setDiscount(newAccountRentalPackageData.getDiscount());
            existingAccountRentalPackage.setPrice(newAccountRentalPackageData.getPrice());
            existingAccountRentalPackage.setDescription(newAccountRentalPackageData.getDescription());
            existingAccountRentalPackage.setDiscountedPrice(newAccountRentalPackageData.getDiscountedPrice());
            existingAccountRentalPackage.setImgURL(newAccountRentalPackageData.getImgURL());
            return accountRentalPackageRepository.save(existingAccountRentalPackage);
        } else {
            return null;
        }
    }

    @Override
    public void deleteAccountRentalPackage(Long id) {
        accountRentalPackageRepository.deleteById(id);
    }

    @Override
    public Page<AccountRentalPackage> getAllAccountRentalPackages(Pageable pageable) {
        return accountRentalPackageRepository.findAll(pageable);
    }

    @Override
    public Page<AccountRentalPackage> searchAccountRentalPackagesPageable(Pageable pageable, String serviceName, String name) {
        return accountRentalPackageRepository.findByServiceAndServiceName(serviceName, name, pageable);
    }
}
