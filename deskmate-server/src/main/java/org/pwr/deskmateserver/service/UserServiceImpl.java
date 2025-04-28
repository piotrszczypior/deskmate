package org.pwr.deskmateserver.service;

import lombok.AllArgsConstructor;
import org.pwr.deskmateserver.dto.JwtResultDTO;
import org.pwr.deskmateserver.dto.LoginDTO;
import org.pwr.deskmateserver.dto.RegisterDTO;
import org.pwr.deskmateserver.dto.UserDTO;
import org.pwr.deskmateserver.exceptions.UnknownUserException;
import org.pwr.deskmateserver.exceptions.UserAlreadyExistsException;
import org.pwr.deskmateserver.model.entities.OfficeWorker;
import org.pwr.deskmateserver.model.entities.User;
import org.pwr.deskmateserver.model.enums.Role;
import org.pwr.deskmateserver.repo.OfficeWorkerRepository;
import org.pwr.deskmateserver.repo.UserRepository;
import org.pwr.deskmateserver.security.UserAuthenticationProvider;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserAuthenticationProvider userAuthenticationProvider;
    private final OfficeWorkerRepository officeWorkerRepository;

    private UserDTO toUserDto(User newUser) {
        return UserDTO.builder()
                .id(newUser.getId())
                .login(newUser.getLogin())
                .email(newUser.getEmail())
                .role(newUser.getRole().name())
                .build();
    }

    @Override
    public JwtResultDTO login(LoginDTO credentialsDto) {
        User user = userRepository.findByLogin(credentialsDto.getLogin())
                .orElseThrow(() -> new UnknownUserException("No user found", HttpStatus.BAD_REQUEST));

        if (user.isLocked()) {
            return JwtResultDTO.builder().success(false).build();
        }

        if (!passwordEncoder.matches(credentialsDto.getPassword(), user.getPassword())) {
            return JwtResultDTO.builder().success(false).build();
        }

        String token = userAuthenticationProvider.createToken(user);
        return JwtResultDTO.builder().accessToken(token).success(true).build();
    }

    @Override
    public UserDTO findUserByLogin(String login) {
        User user = userRepository.findByLogin(login)
                .orElseThrow(() -> new UnknownUserException("Unknown user", HttpStatus.BAD_REQUEST));
        return toUserDto(user);
    }

    @Override
    public UserDTO register(RegisterDTO registerDTO) {
        if (userRepository.existsByLogin(registerDTO.getLogin())) {
            throw new UserAlreadyExistsException("User with this login already exists", HttpStatus.CONFLICT);
        }

        User user = new User();
        user.setLogin(registerDTO.getLogin());
        user.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
        user.setEmail(registerDTO.getEmail());
        user.setRole(Role.OFFICE_WORKER);

        OfficeWorker officeWorker = new OfficeWorker();
        officeWorker.setFirstName(registerDTO.getFirstName());
        officeWorker.setLastName(registerDTO.getLastName());
        officeWorker.setUser(user);

        userRepository.save(user);
        officeWorkerRepository.save(officeWorker);

        return new UserDTO(user.getId(), user.getEmail(), user.getLogin(), user.getRole().name(), null);
    }
}
