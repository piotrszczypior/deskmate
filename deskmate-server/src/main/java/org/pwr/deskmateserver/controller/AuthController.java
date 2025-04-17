package org.pwr.deskmateserver.controller;

import org.pwr.deskmateserver.api.AuthApi;
import org.pwr.deskmateserver.dto.JwtResultDTO;
import org.pwr.deskmateserver.dto.LoginDTO;
import org.pwr.deskmateserver.dto.RegisterDTO;
import org.pwr.deskmateserver.dto.UserDTO;
import org.pwr.deskmateserver.exceptions.UserAlreadyExistsException;
import org.pwr.deskmateserver.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class AuthController implements AuthApi {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @Override
    public ResponseEntity<Object> login(LoginDTO loginDTO) {
        JwtResultDTO jwtResult = userService.login(loginDTO);

        if (jwtResult.isSuccess()) {
            return new ResponseEntity<>(jwtResult, HttpStatus.OK);
        }
        return ResponseEntity.badRequest().build();
    }

    @Override
    public ResponseEntity<Object> register(RegisterDTO registerDTO) {
        try {
            UserDTO newUser = userService.register(registerDTO);
            return new ResponseEntity<>(newUser, HttpStatus.CREATED);
        } catch (UserAlreadyExistsException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        }
    }

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<String> handleUserAlreadyExistsException(UserAlreadyExistsException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.CONFLICT);
    }
}

