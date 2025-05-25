package com.quiz_wizard_backend.Backend_For_QuizWizard.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.quiz_wizard_backend.Backend_For_QuizWizard.model.User;

public interface UserRepository extends MongoRepository<User,String> {

    Optional<User> findByUserName(String userName);
    Optional<User> findByEmail(String email);
    Optional<User> findByVerificationToken(String verificationToken); 
    boolean existsByUserName(String userName);
    boolean existsByEmail(String email);
    boolean deleteByUserName(String userName);
    List<User> findByEnabledFalseAndCreatedAtBefore(LocalDateTime threshold);
}
