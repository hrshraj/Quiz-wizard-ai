package com.quiz_wizard_backend.Backend_For_QuizWizard.mapper;

import com.quiz_wizard_backend.Backend_For_QuizWizard.dto.RegisterDTO;
import com.quiz_wizard_backend.Backend_For_QuizWizard.model.User;

public class Register_Login_Mapper {

    public static User DtoToModelMapper(RegisterDTO registerDTO){
        
        User user = new User();
        user.setUserName(registerDTO.getUserName());
        user.setPassword(registerDTO.getPassword());
        user.setEmail(registerDTO.getEmail());
        user.setRole(registerDTO.getRole());
        return user;
    }

    public static RegisterDTO ModelToDtoMapper(User user){

        RegisterDTO registerDTO =new RegisterDTO();
        registerDTO.setUserName(user.getUserName());
        registerDTO.setPassword(user.getPassword());
        registerDTO.setEmail(user.getEmail());
        registerDTO.setRole(user.getRole());
        return registerDTO;
    }

}
