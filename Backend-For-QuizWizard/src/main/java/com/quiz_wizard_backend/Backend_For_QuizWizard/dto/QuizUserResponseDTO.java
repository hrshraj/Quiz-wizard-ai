package com.quiz_wizard_backend.Backend_For_QuizWizard.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


public class QuizUserResponseDTO {

    List<UserQuestionResponse> userResponseOfEachQues;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    private static class UserQuestionResponse {

        private String questionId;
        private String userAnswer;
      
    }

}
