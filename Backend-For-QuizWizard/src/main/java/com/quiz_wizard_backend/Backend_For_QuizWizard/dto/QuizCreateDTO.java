package com.quiz_wizard_backend.Backend_For_QuizWizard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuizCreateDTO {

    private String email;
    private String subject;
    private String topic;
    private int quesCount;
    private String difficulyLevel;
    private String quesType;
    private String targetAudience;

}
