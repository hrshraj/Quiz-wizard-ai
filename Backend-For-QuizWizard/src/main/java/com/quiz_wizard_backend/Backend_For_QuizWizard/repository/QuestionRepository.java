package com.quiz_wizard_backend.Backend_For_QuizWizard.repository;

import com.quiz_wizard_backend.Backend_For_QuizWizard.model.Question;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface QuestionRepository extends MongoRepository<Question, String> {

    Optional<Question> findByText(String text);
    boolean existsByText(String question);
    List<Question> findByIdIn(List<String> ids);
    List<Question> findBySubjectAndTopicAndDifficultyLevel(String subject, String topic, String difficultyLevel);
}