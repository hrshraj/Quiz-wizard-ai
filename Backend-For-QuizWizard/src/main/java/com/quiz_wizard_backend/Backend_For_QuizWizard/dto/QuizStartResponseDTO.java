package com.quiz_wizard_backend.Backend_For_QuizWizard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuizStartResponseDTO {
    
    private String quizLogId; // The ID of the newly created QuizLog entry
    private List<QuestionDTO> questions; // The questions for the user to answer (without correct answers)
}

