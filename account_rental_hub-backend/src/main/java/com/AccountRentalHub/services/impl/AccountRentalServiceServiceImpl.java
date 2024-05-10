package com.AccountRentalHub.services.impl;

import com.AccountRentalHub.models.AccountRentalServices;
import com.AccountRentalHub.repository.AccountRentalServiceRepository;
import com.AccountRentalHub.models.AccountRentalServices;
import com.AccountRentalHub.services.AccountRentalService;
import com.AccountRentalHub.services.AccountRentalServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccountRentalServiceServiceImpl implements AccountRentalServiceService {

    @Autowired
    private AccountRentalServiceRepository accountRentalServiceRepository;
    @Override
    public Optional<AccountRentalServices> getAccountRentalServiceById(Long id) {
        return accountRentalServiceRepository.findById(id);
    }

    @Override
    public AccountRentalServices createAccountRentalService(AccountRentalServices accountRentalService) {
        return accountRentalServiceRepository.save(accountRentalService);
    }

    @Override
    public AccountRentalServices updateAccountRentalService(Long id, AccountRentalServices newAccountRentalServiceData) {
        Optional<AccountRentalServices> existingAccountRentalServiceOptional = accountRentalServiceRepository.findById(id);
        if (existingAccountRentalServiceOptional.isPresent()) {
            AccountRentalServices existingAccountRentalService = existingAccountRentalServiceOptional.get();
            // Cập nhật các trường mới
            existingAccountRentalService.setName(newAccountRentalServiceData.getName());
            existingAccountRentalService.setImage(newAccountRentalServiceData.getImage());
            existingAccountRentalService.setDescription(newAccountRentalServiceData.getDescription());
            existingAccountRentalService.setWebsite(newAccountRentalServiceData.getWebsite());
            // Cập nhật createdAt và updatedAt không cần thiết vì chúng sẽ được tự động cập nhật
            return accountRentalServiceRepository.save(existingAccountRentalService);
        } else {
            // Xử lý khi không tìm thấy AccountRentalService
            return null;
        }
    }

    @Override
    public void deleteAccountRentalService(Long id) {
        accountRentalServiceRepository.deleteById(id);
    }

    @Override
    public Page<AccountRentalServices> getAllAccountRentalServices(Pageable pageable) {
        return accountRentalServiceRepository.findAll(pageable);
    }
}
