package com.quiz_wizard_backend.Backend_For_QuizWizard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuizSubmissionResultDTO {
    private String quizLogId;
    private int totalScore;
    private int maxPossibleScore;
    private List<QuestionResult> questionResults;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class QuestionResult {
        private String questionId;
        private String questionText;
        private String correctAnswer;
        private String userAnswer;    
        private int marksObtained;    
        private int totalMarks;       
    }
}