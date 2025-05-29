package com.quiz_wizard_backend.Backend_For_QuizWizard.service;

import com.quiz_wizard_backend.Backend_For_QuizWizard.dto.QuestionDTO;
import com.quiz_wizard_backend.Backend_For_QuizWizard.mapper.QuestionMapper; // Ensure this mapper class exists and has static methods
import com.quiz_wizard_backend.Backend_For_QuizWizard.model.Question;
import com.quiz_wizard_backend.Backend_For_QuizWizard.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class QuestionService {

    private final QuestionRepository questionRepository;

    @Transactional
    public QuestionDTO createQuestion(QuestionDTO questionDTO) {

        if (questionRepository.existsByText(questionDTO.getText())) {
            throw new RuntimeException("Question with this text already exists.");
        }

        Question question = QuestionMapper.mapToQuestion(questionDTO);
        Question savedQuestion = questionRepository.save(question);
        
        return QuestionMapper.mapToQuestionDTO(savedQuestion);
    }

    public List<QuestionDTO> getAllQuestions() {
        return questionRepository.findAll().stream()
                .map(QuestionMapper::mapToQuestionDTO)
                .collect(Collectors.toList());
    }

    public Optional<QuestionDTO> getQuestionById(String id) {
        return questionRepository.findById(id)
                .map(QuestionMapper::mapToQuestionDTO);
    }

    @Transactional
    public QuestionDTO updateQuestion(String id, QuestionDTO questionDTO) {
        Question existingQuestion = questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found with ID: " + id));


        existingQuestion.setSubject(questionDTO.getSubject());
        existingQuestion.setTopic(questionDTO.getTopic());
        existingQuestion.setDifficultyLevel(questionDTO.getDifficultyLevel());
        existingQuestion.setQuestionType(questionDTO.getQuestionType());
        existingQuestion.setText(questionDTO.getText());
        existingQuestion.setOptions(questionDTO.getOptions());
        existingQuestion.setCorrectAnswer(questionDTO.getCorrectAnswer());
        existingQuestion.setDefaultMarks(questionDTO.getDefaultMarks());

        Question updatedQuestion = questionRepository.save(existingQuestion);
    
        return QuestionMapper.mapToQuestionDTO(updatedQuestion);
    }

    @Transactional
    public void deleteQuestion(String id) {
        if (!questionRepository.existsById(id)) {
            throw new RuntimeException("Question not found with ID: " + id);
        }
        questionRepository.deleteById(id);
    }

    @Transactional
    public List<Question> saveGeneratedQuestions(List<Question> questions) {
        
        List<Question> uniqueQuestionsToSave = new ArrayList<>();
        for (Question question : questions) {
            
            if (!questionRepository.existsByText(question.getText())) {
                uniqueQuestionsToSave.add(question);
            } else {
                log.info("Skipping saving question: '{}' as it already exists.", question.getText());
            }
        }
    
        return questionRepository.saveAll(uniqueQuestionsToSave);
    }
  
    public Map<String, Question> getQuestionsByIds(List<String> questionIds) {
        return questionRepository.findByIdIn(questionIds).stream()
                .collect(Collectors.toMap(Question::getId, q -> q));
    }

    public List<Question> getBySubjectAndTopicAndDifficulty(String subject, String topic, String difficultyLevel){

        return questionRepository.findBySubjectAndTopicAndDifficultyLevel(subject,topic,difficultyLevel);
    }
}