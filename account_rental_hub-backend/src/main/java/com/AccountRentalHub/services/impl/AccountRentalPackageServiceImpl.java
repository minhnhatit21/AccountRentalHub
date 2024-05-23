package com.AccountRentalHub.services.impl;

import com.AccountRentalHub.models.AccountRentalPackage;
import com.AccountRentalHub.models.AccountRentalServices;
import com.AccountRentalHub.repository.AccountRentalPackageRepository;
import com.AccountRentalHub.repository.AccountRentalServiceRepository;
import com.AccountRentalHub.services.AccountRentalPackageService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
public class AccountRentalPackageServiceImpl implements AccountRentalPackageService {

    @Autowired
    private AccountRentalPackageRepository accountRentalPackageRepository;

    @Autowired
    private AccountRentalServiceRepository accountRentalServiceRepository;
    @Override
    @Transactional
    public AccountRentalPackage createAccountRentalPackage(AccountRentalPackage accountRentalPackage) throws Exception {
        // Kiểm tra tên gói đã tồn tại hay chưa
        if (accountRentalPackageRepository.existsByName(accountRentalPackage.getName())) {
            throw new Exception("Tên đã tồn tại: " + accountRentalPackage.getName());
        }

        // Kiểm tra price và discountedPrice
        String pricePattern = "^\\d+(\\.\\d+)?$"; // Regex cho số dương, có thể có phần thập phân
        if (accountRentalPackage.getPrice() == null || !Pattern.matches(pricePattern, accountRentalPackage.getPrice().toString())) {
            throw new Exception("Giá gốc không hợp lệ");
        }
        if (accountRentalPackage.getDiscountedPrice() == null || !Pattern.matches(pricePattern, accountRentalPackage.getDiscountedPrice().toString())) {
            throw new Exception("Giá đã giảm không hợp lệ");
        }
        if (accountRentalPackage.getDiscountedPrice() >= accountRentalPackage.getPrice()) {
            throw new Exception("Giá đã giảm không được lớn hơn hoặc bằng giá gốc");
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
    @Transactional
    public AccountRentalPackage updateAccountRentalPackage(Long id, AccountRentalPackage newAccountRentalPackageData) throws Exception {
        Optional<AccountRentalPackage> existingAccountRentalPackageOptional = accountRentalPackageRepository.findById(id);
        if (existingAccountRentalPackageOptional.isPresent()) {
            AccountRentalPackage existingAccountRentalPackage = existingAccountRentalPackageOptional.get();

            // Check package name exist
            if (!existingAccountRentalPackage.getName().equals(newAccountRentalPackageData.getName()) &&
                    accountRentalPackageRepository.existsByName(newAccountRentalPackageData.getName())) {
                throw new Exception("Tên đã tồn tại: " + newAccountRentalPackageData.getName());
            }

            // Check price and discountedPrice
            String pricePattern = "^\\d+(\\.\\d+)?$";
            if (newAccountRentalPackageData.getPrice() != null &&
                    !Pattern.matches(pricePattern, newAccountRentalPackageData.getPrice().toString())) {
                throw new Exception("Giá gốc không hợp lệ");
            }
            if (newAccountRentalPackageData.getDiscountedPrice() != null &&
                    !Pattern.matches(pricePattern, newAccountRentalPackageData.getDiscountedPrice().toString())) {
                throw new Exception("Giá đã giảm không hợp lệ");
            }
            if (newAccountRentalPackageData.getDiscountedPrice() != null &&
                    newAccountRentalPackageData.getPrice() != null &&
                    newAccountRentalPackageData.getDiscountedPrice() >= newAccountRentalPackageData.getPrice()) {
                throw new Exception("Giá đã giảm không được lớn hơn hoặc bằng giá gốc");
            }


            existingAccountRentalPackage.setName(newAccountRentalPackageData.getName());
            existingAccountRentalPackage.setDuration(newAccountRentalPackageData.getDuration());
            existingAccountRentalPackage.setPrice(newAccountRentalPackageData.getPrice());
            existingAccountRentalPackage.setDiscountedPrice(newAccountRentalPackageData.getDiscountedPrice());

            if (newAccountRentalPackageData.getPrice() != null && newAccountRentalPackageData.getDiscountedPrice() != null) {
                double discountPercentage = 100 - (newAccountRentalPackageData.getDiscountedPrice() / newAccountRentalPackageData.getPrice()) * 100;
                existingAccountRentalPackage.setDiscount((int) Math.ceil(discountPercentage));
            }
            existingAccountRentalPackage.setDescription(newAccountRentalPackageData.getDescription());
            existingAccountRentalPackage.setImgURL(newAccountRentalPackageData.getImgURL());
            existingAccountRentalPackage.setAmount(newAccountRentalPackageData.getAmount());

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
