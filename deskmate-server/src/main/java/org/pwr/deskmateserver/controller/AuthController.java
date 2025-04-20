package org.pwr.deskmateserver.controller;

import lombok.AllArgsConstructor;
import org.pwr.deskmateserver.api.AuthApi;
import org.pwr.deskmateserver.dto.*;
import org.pwr.deskmateserver.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class AuthController implements AuthApi {
    private UserService userService;

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
        return new ResponseEntity<>(userService.register(registerDTO), HttpStatus.CREATED);
    }
}

