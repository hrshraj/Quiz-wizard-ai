package com.quiz_wizard_backend.Backend_For_QuizWizard.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.quiz_wizard_backend.Backend_For_QuizWizard.dto.EmailRequestDTO;
import com.quiz_wizard_backend.Backend_For_QuizWizard.dto.LoginDTO;
import com.quiz_wizard_backend.Backend_For_QuizWizard.dto.LoginResponseDTO;
import com.quiz_wizard_backend.Backend_For_QuizWizard.dto.RegisterDTO;
import com.quiz_wizard_backend.Backend_For_QuizWizard.service.AuthService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
   public ResponseEntity<?> registerUser(@RequestBody RegisterDTO registerDTO ){

    try{

    RegisterDTO registeredDto = authService.registerUser(registerDTO);
    return new ResponseEntity<>(registeredDto,HttpStatus.CREATED);
   }
   catch(RuntimeException e){

    return new ResponseEntity<>(HttpStatus.CONFLICT);
   }
   catch(Exception e){
    return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
   }
   }
     @PostMapping("/register-admin")
   public ResponseEntity<?> registerAdmin(@RequestBody RegisterDTO registerDTO ){

    try{

    RegisterDTO registeredDto = authService.registerUser(registerDTO);
    return new ResponseEntity<>(registeredDto,HttpStatus.CREATED);
   }
   catch(RuntimeException e){

    return new ResponseEntity<>(HttpStatus.CONFLICT);
   }
   catch(Exception e){
    return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
   }
   }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> loginUser(@RequestBody LoginDTO loginDTO) {
        try {
            LoginResponseDTO response = authService.loginUser(loginDTO);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (BadCredentialsException e) {

            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        } catch (RuntimeException e) {
            
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); 
        } catch (Exception e) {
            
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
     @GetMapping("/verify")
    public ResponseEntity<String> verifyUserEmail(@RequestParam("token") String token) {
        try {
            if (authService.verifyEmail(token)) {
                return new ResponseEntity<>("Email verified successfully! You can now log in.", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Invalid or expired verification token.", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e){
            return new ResponseEntity<>("An error occurred during email verification.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/resend-verification") 
    public ResponseEntity<String> resendVerificationEmail(@RequestBody EmailRequestDTO emailRequestDTO) {
        try {
            authService.resendVerificationEmail(emailRequestDTO.getEmail());
            return new ResponseEntity<>("Verification email resent successfully. Please check your inbox.", HttpStatus.OK);

        } catch (RuntimeException e) {

            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            
            return new ResponseEntity<>("An error occurred while trying to resend the verification email.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
