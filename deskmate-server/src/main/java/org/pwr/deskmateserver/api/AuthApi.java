package org.pwr.deskmateserver.api;

import org.pwr.deskmateserver.dto.LoginDTO;
import org.pwr.deskmateserver.dto.RegisterDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;


@RequestMapping("api/v1/")
public interface AuthApi {

    @PostMapping("login")
    ResponseEntity<Object> login(@RequestBody LoginDTO loginDTO);

    @PostMapping("register")
    ResponseEntity<Object> register(@RequestBody RegisterDTO registerDTO);
}
