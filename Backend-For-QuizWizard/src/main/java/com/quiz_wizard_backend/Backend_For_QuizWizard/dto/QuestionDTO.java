package com.quiz_wizard_backend.Backend_For_QuizWizard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuestionDTO {
    
    private String id;
    private String subject;
    private String topic;
    private String difficultyLevel;
    private String questionType;
    private String text;
    private List<String> options;
    private String correctAnswer; 
    private int defaultMarks;
}