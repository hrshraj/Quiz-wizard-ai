package com.quiz_wizard_backend.Backend_For_QuizWizard.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String senderEmail;

    @Value("${app.base-url}") 
    private String appBaseUrl;

    public void sendVerificationEmail(String toEmail, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(senderEmail);
        message.setTo(toEmail);
        message.setSubject("Verify Your Email Address for Quiz Wizard");
        
        String verificationLink = appBaseUrl + "/auth/verify?token=" + token;
        
        message.setText("Thank you for registering with Quiz Wizard!\n\n"
                      + "Please click the following link to verify your email address:\n"
                      + verificationLink + "\n\n"
                      + "If you did not register for this service, please ignore this email.");

        mailSender.send(message);
    }
}
