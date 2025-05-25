package com.quiz_wizard_backend.Backend_For_QuizWizard.service; // Or config, depending on your package structure

import com.quiz_wizard_backend.Backend_For_QuizWizard.model.User;
import com.quiz_wizard_backend.Backend_For_QuizWizard.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUserName(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));

        if (!user.isEnabled()) {
            throw new UsernameNotFoundException("User account is not enabled. Please verify your email.");
        }

        // Convert your custom User model to Spring Security's UserDetails
        // Note: Spring Security's UserDetails requires a Collection<? extends GrantedAuthority> for roles
        return new org.springframework.security.core.userdetails.User(
                user.getUserName(),
                user.getPassword(),
                user.isEnabled(), // Account enabled
                true, // Account non-expired
                true, // Credentials non-expired
                true, // Account non-locked
                Collections.singletonList(() -> "ROLE_" + user.getRole().toUpperCase()) // Simple role mapping
        );
    }
}
