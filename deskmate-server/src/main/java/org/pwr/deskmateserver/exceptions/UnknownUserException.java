package org.pwr.deskmateserver.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class UnknownUserException extends RuntimeException {

    private final HttpStatus status;

    public UnknownUserException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }

}
