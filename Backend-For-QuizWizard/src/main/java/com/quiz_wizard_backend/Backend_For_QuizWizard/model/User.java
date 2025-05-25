package com.quiz_wizard_backend.Backend_For_QuizWizard.model;


import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection ="users")
public class User {
    
    @Id
    private String Id;
    private String userName;
    private String password;
    private String email;
    private String role;
    private boolean enabled;
    private String verificationToken;
    private LocalDateTime createdAt;
    private LocalDateTime tokenIssuedAt;
}
