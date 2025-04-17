package org.pwr.deskmateserver.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class UserAlreadyExistsException extends ResponseStatusException {
    public UserAlreadyExistsException(String message, HttpStatus status) {
        super(status, message);
    }
}