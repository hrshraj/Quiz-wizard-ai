package com.quiz_wizard_backend.Backend_For_QuizWizard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class BackendForQuizWizardApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendForQuizWizardApplication.class, args);
	}

}
