package com.AccountRentalHub.services.impl;

import com.AccountRentalHub.models.AccountRentalPackage;
import com.AccountRentalHub.models.AccountRentalServices;
import com.AccountRentalHub.repository.AccountRentalPackageRepository;
import com.AccountRentalHub.repository.AccountRentalServiceRepository;
import com.AccountRentalHub.services.AccountRentalPackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AccountRentalPackageServiceImpl implements AccountRentalPackageService {

    @Autowired
    private AccountRentalPackageRepository accountRentalPackageRepository;

    @Autowired
    private AccountRentalServiceRepository accountRentalServiceRepository;
    @Override
    public AccountRentalPackage createAccountRentalPackage(AccountRentalPackage accountRentalPackage) throws Exception {
        // Kiểm tra tên gói đã tồn tại hay chưa
        if (accountRentalPackageRepository.existsByName(accountRentalPackage.getName())) {
            throw new Exception("Tên đã tồn tại: " + accountRentalPackage.getName());
        }

        // Tính toán giá trị discount dựa trên giá gốc và giá đã giảm
        if (accountRentalPackage.getPrice() != null && accountRentalPackage.getDiscountedPrice() != null) {
            double discountPercentage = 100 - (accountRentalPackage.getDiscountedPrice() / accountRentalPackage.getPrice()) * 100;
            accountRentalPackage.setDiscount((int) Math.ceil(discountPercentage));
        }

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
    public List<AccountRentalPackage> getAllAccountRentalPackages() {
        return accountRentalPackageRepository.findAllAccountRentalPackages();
    }

    @Override
    public Page<AccountRentalPackage> getAllAccountRentalPackages(Pageable pageable) {
        return accountRentalPackageRepository.findAll(pageable);
    }

    @Override
    public Page<AccountRentalPackage> searchAccountRentalPackagesPageable(Pageable pageable,Long serviceId, String name) {
        return accountRentalPackageRepository.findByServiceIDAndPackageName(serviceId, name, pageable);
    }
}
