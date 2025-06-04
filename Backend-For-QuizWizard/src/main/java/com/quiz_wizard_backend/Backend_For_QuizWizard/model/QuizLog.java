package com.quiz_wizard_backend.Backend_For_QuizWizard.model;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection="quiz_logs")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class QuizLog {

    @Id
    private String id;
    private String email; 
    private LocalDateTime timeStamp; 
    private String subject;
    private String topic;
    private int quesCount; 
    private String difficultyLevel;
    private String quesType;
    private String targetAudience;
    private String status; 


    private List<QuestionAttemptLog> questionAttempts; 

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder 
    public static class QuestionAttemptLog { 

        private String questionId; 
        private String userAnswer; 
        private int userMarks;      
        private int totalMarks;     
        private LocalTime timeTaken;
    }
    private int totalQuizScore;
    private int maxPossibleQuizScore;
}