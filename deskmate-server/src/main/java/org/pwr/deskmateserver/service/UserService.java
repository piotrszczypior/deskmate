package org.pwr.deskmateserver.service;


import org.pwr.deskmateserver.dto.JwtResultDTO;
import org.pwr.deskmateserver.dto.LoginDTO;
import org.pwr.deskmateserver.dto.RegisterDTO;
import org.pwr.deskmateserver.dto.UserDTO;

public interface UserService {

    JwtResultDTO login(LoginDTO credentialsDto);

    UserDTO findUserByLogin(String login);

    UserDTO register(RegisterDTO registerDTO);
}
