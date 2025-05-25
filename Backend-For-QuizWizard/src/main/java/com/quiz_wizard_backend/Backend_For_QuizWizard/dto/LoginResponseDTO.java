package com.quiz_wizard_backend.Backend_For_QuizWizard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponseDTO {

    private String jwtToken;
    private String role;

}
