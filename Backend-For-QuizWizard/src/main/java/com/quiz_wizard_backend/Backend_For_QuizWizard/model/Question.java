package com.quiz_wizard_backend.Backend_For_QuizWizard.model;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "questions") 
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Question {

    @Id
    private String id; 
    private String subject; 
    private String topic; 
    private String difficultyLevel; 
    private String questionType; 
    private String text; 
    private List<String> options; 
    private String correctAnswer; 
    private int defaultMarks; 
    private String createdBy;
    private LocalDateTime createdAt; 
}
