package com.quiz_wizard_backend.Backend_For_QuizWizard.service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID; // Import UUID

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.quiz_wizard_backend.Backend_For_QuizWizard.dto.LoginDTO;
import com.quiz_wizard_backend.Backend_For_QuizWizard.dto.LoginResponseDTO;
import com.quiz_wizard_backend.Backend_For_QuizWizard.dto.RegisterDTO;
import com.quiz_wizard_backend.Backend_For_QuizWizard.mapper.Register_Login_Mapper;
import com.quiz_wizard_backend.Backend_For_QuizWizard.model.User;
import com.quiz_wizard_backend.Backend_For_QuizWizard.repository.UserRepository;
import com.quiz_wizard_backend.Backend_For_QuizWizard.utils.JwtUtils;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final EmailService emailService; 
    
    @Transactional
    public RegisterDTO registerUser(RegisterDTO registerDTO){

        User user = Register_Login_Mapper.DtoToModelMapper(registerDTO);

        if(userRepository.findByUserName(user.getUserName()).isPresent()){
            throw new RuntimeException("UserName already present");
        }

        if(userRepository.findByEmail(user.getEmail()).isPresent()){
            throw new RuntimeException("Email id already registered");
        }

        user.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
        user.setRole("USER"); 
        user.setEnabled(false);

        String verificationToken = UUID.randomUUID().toString();

        user.setVerificationToken(verificationToken);
        user.setCreatedAt(LocalDateTime.now());
        user.setTokenIssuedAt(LocalDateTime.now());

        userRepository.save(user);

        emailService.sendVerificationEmail(user.getEmail(), verificationToken);

        return Register_Login_Mapper.ModelToDtoMapper(user);
    }

    public LoginResponseDTO loginUser(LoginDTO loginDTO){

        org.springframework.security.core.Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDTO.getUserName(), loginDTO.getPassword())
        );

        String jwt = jwtUtils.generatedEncodedToken(authentication);
        Optional<User> optionalUser = userRepository.findByUserName(loginDTO.getUserName());

        User user = optionalUser.orElseThrow(()-> new RuntimeException("User not found after authentication"));

        String role = user.getRole();

        return new LoginResponseDTO(jwt, role);
    }
    
    @Transactional
    public boolean verifyEmail(String token) {
        Optional<User> optionalUser = userRepository.findByVerificationToken(token);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            if (user.getTokenIssuedAt().plusHours(24).isBefore(LocalDateTime.now())) {
                 return false; 
            }
            user.setEnabled(true); 
            user.setVerificationToken(null); 
            userRepository.save(user);
            return true;
        }
        return false;
    }

    @Transactional
    public void resendVerificationEmail(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isEmpty()) {
            throw new RuntimeException("User with this email not found.");
        }

        User user = optionalUser.get();

        if (user.isEnabled()) {
            throw new RuntimeException("Email is already verified for this user.");
        }

        // Optional: Implement rate limiting for resend requests
        if (user.getTokenIssuedAt() != null && user.getTokenIssuedAt().plusMinutes(1).isAfter(LocalDateTime.now())) {
            throw new RuntimeException("Please wait a minute before requesting another verification email.");
         }

        String newVerificationToken = UUID.randomUUID().toString();
        user.setVerificationToken(newVerificationToken);
        user.setTokenIssuedAt(LocalDateTime.now()); // Update issuance time for the new token

        userRepository.save(user);

        // This call to EmailService.sendVerificationEmail should ideally be successful
        // If it throws an exception, the transaction will roll back the user update.
        emailService.sendVerificationEmail(user.getEmail(), newVerificationToken);
    }
}