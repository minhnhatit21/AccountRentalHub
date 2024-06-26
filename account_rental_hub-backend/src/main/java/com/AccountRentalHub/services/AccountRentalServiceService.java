package com.AccountRentalHub.services;

import com.AccountRentalHub.models.AccountRentalServices;
import com.AccountRentalHub.payload.response.ServiceResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface AccountRentalServiceService {
    Optional<AccountRentalServices> getAccountRentalServiceById(Long id);
    AccountRentalServices createAccountRentalService(AccountRentalServices accountRentalService) throws Exception;
    AccountRentalServices updateAccountRentalService(Long id, AccountRentalServices newAccountRentalServiceData);
    void deleteAccountRentalService(Long id);
    List<AccountRentalServices> getAllServiceResponses();
    Page<AccountRentalServices> getAllAccountRentalServices(Pageable pageable);
    List<AccountRentalServices> searchAccountRentalServicesByCategory(String category);
    Page<AccountRentalServices> searchAccountRentalServicesByCategoryPageable(Pageable pageable, String category);
    Page<AccountRentalServices> searchAccountRentalServicesByCategoryAndNamePageable(Pageable pageable, String category, String name);

}
