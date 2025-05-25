package com.quiz_wizard_backend.Backend_For_QuizWizard.model;

import java.time.LocalDateTime;

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
    private String difficulyLevel;
    private String quesType;
    private String targetAudience;

}
