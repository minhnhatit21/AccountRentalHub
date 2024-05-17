package com.AccountRentalHub.services.impl;

import com.AccountRentalHub.models.AccountRentalServices;
import com.AccountRentalHub.payload.response.ServiceResponse;
import com.AccountRentalHub.repository.AccountRentalServiceRepository;
import com.AccountRentalHub.services.AccountRentalServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
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
    public AccountRentalServices createAccountRentalService(AccountRentalServices accountRentalService) throws Exception {
        // Kiểm tra xem name đã tồn tại chưa
        if (accountRentalServiceRepository.existsByName(accountRentalService.getName())) {
            throw new Exception("Tên đã tồn tại: " + accountRentalService.getName());
        }
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
            existingAccountRentalService.setCategory(newAccountRentalServiceData.getCategory());
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
    public List<AccountRentalServices> getAllServiceResponses() {
        return accountRentalServiceRepository.findAllServiceResponses();
    }


    @Override
    public Page<AccountRentalServices> getAllAccountRentalServices(Pageable pageable) {
        return accountRentalServiceRepository.findAll(pageable);
    }

    @Override
    public List<AccountRentalServices> searchAccountRentalServicesByCategory(String category) {
        return accountRentalServiceRepository.findByCategory(category);
    }

    @Override
    public Page<AccountRentalServices> searchAccountRentalServicesByCategoryPageable(Pageable pageable, String category) {
        return accountRentalServiceRepository.findByCategory(category, pageable);
    }

    @Override
    public Page<AccountRentalServices> searchAccountRentalServicesByCategoryAndNamePageable(Pageable pageable, String category, String name) {
        return accountRentalServiceRepository.findByCategoryAndName(category,name, pageable);
    }
}
