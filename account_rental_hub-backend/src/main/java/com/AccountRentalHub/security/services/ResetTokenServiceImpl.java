package com.AccountRentalHub.security.services;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Service;

@Service
public class ResetTokenServiceImpl implements ResetTokenService {
    private static final ConcurrentHashMap<String, Long> resetTokens = new ConcurrentHashMap<>();

    @Override
    public void saveResetToken(Long userId, String resetToken) {
        resetTokens.put(resetToken, userId);
    }

    @Override
    public Optional<Long> getUserIdFromResetToken(String resetToken) {
        return Optional.ofNullable(resetTokens.get(resetToken));
    }

    @Override
    public void deleteResetToken(String resetToken) {
        resetTokens.remove(resetToken);
    }
}
