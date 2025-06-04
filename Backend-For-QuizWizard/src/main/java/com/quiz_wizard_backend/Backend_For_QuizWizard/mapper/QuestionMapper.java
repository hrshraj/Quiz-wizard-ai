package com.quiz_wizard_backend.Backend_For_QuizWizard.mapper;

import com.quiz_wizard_backend.Backend_For_QuizWizard.dto.QuestionDTO;
import com.quiz_wizard_backend.Backend_For_QuizWizard.model.Question;

public class QuestionMapper {

    public static QuestionDTO mapToQuestionDTO(Question question){

         return new QuestionDTO(
                question.getId(),
                question.getSubject(),
                question.getTopic(),
                question.getDifficultyLevel(),
                question.getQuestionType(),
                question.getText(),
                question.getOptions(),
                question.getCorrectAnswer(),
                question.getDefaultMarks()
        );
        
    }

    public static Question mapToQuestion(QuestionDTO questionDTO){

        return Question.builder()
                .id(questionDTO.getId())
                .subject(questionDTO.getSubject())
                .topic(questionDTO.getTopic())
                .difficultyLevel(questionDTO.getDifficultyLevel())
                .questionType(questionDTO.getQuestionType())
                .text(questionDTO.getText())
                .options(questionDTO.getOptions())
                .correctAnswer(questionDTO.getCorrectAnswer())
                .defaultMarks(questionDTO.getDefaultMarks())
                .build();
    }

}
