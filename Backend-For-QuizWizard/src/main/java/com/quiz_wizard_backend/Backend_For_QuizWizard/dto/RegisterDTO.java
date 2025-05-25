package com.quiz_wizard_backend.Backend_For_QuizWizard.dto;

import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterDTO {

    private String userName;
    private String password;
    @Email
    private String email;
    private String role;

}
