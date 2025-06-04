package com.quiz_wizard_backend.Backend_For_QuizWizard.repository;

import com.quiz_wizard_backend.Backend_For_QuizWizard.model.QuizLog;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface QuizLogRepository extends MongoRepository<QuizLog, String> {
    
    List<QuizLog> findByEmailOrderByTimeStampDesc(String email);
    Optional<QuizLog> findByEmailAndStatus(String email, String status);
    List<QuizLog> findByEmailAndSubjectAndTopic(String email, String subject, String topic);
}
