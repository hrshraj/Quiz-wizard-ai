package com.quiz_wizard_backend.Backend_For_QuizWizard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginDTO {

    private String userName;
    private String password;
}
