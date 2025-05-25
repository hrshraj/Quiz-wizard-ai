package com.quiz_wizard_backend.Backend_For_QuizWizard.service;

import com.quiz_wizard_backend.Backend_For_QuizWizard.model.User;
import com.quiz_wizard_backend.Backend_For_QuizWizard.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j; // For logging (add dependency if not already there)
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j // Lombok annotation for logger
public class CleanUpService {

    private final UserRepository userRepository;

    // Define the period after which unverified accounts should be deleted (e.g., 24 hours)
    // You can externalize this to application.properties
    // @Value("${app.unverified-account-cleanup-days:2}") // Default to 2 days
    // private int unverifiedAccountCleanupDays;
    private final long UNVERIFIED_ACCOUNT_EXPIRY_HOURS = 24; // Example: delete after 24 hours

    // This method will run every hour (or every 10 minutes, etc., adjust cron expression)
    // Cron expression: seconds minutes hours dayOfMonth month dayOfWeek
    @Scheduled(cron = "0 0 * * * *") // Runs at the beginning of every hour
    // @Scheduled(fixedRate = 3600000) // Runs every hour (3600000 ms)
    public void cleanupUnverifiedAccounts() {
        log.info("Starting cleanup of unverified accounts...");

        LocalDateTime expiryThreshold = LocalDateTime.now().minusHours(UNVERIFIED_ACCOUNT_EXPIRY_HOURS);

        // Find users that are not enabled AND were created before the expiry threshold
        List<User> expiredUnverifiedUsers = userRepository.findByEnabledFalseAndCreatedAtBefore(expiryThreshold);

        if (expiredUnverifiedUsers.isEmpty()) {
            log.info("No expired unverified accounts found for cleanup.");
            return;
        }

        log.info("Found {} expired unverified accounts to delete.", expiredUnverifiedUsers.size());

        for (User user : expiredUnverifiedUsers) {
            try {
                userRepository.delete(user);
                log.info("Deleted unverified user: {}", user.getUserName());
            } catch (Exception e) {
                log.error("Error deleting unverified user {}: {}", user.getUserName(), e.getMessage());
            }
        }
        log.info("Cleanup of unverified accounts finished.");
    }
}
