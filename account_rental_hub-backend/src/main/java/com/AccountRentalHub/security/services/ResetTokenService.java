package com.AccountRentalHub.security.services;

import java.util.Optional;

public interface ResetTokenService {
    void saveResetToken(Long userId, String resetToken);
    Optional<Long> getUserIdFromResetToken(String resetToken);
    void deleteResetToken(String resetToken);
}
