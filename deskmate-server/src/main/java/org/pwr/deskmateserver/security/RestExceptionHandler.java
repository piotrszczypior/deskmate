package org.pwr.deskmateserver.security;

import org.pwr.deskmateserver.dto.ErrorDTO;
import org.pwr.deskmateserver.exceptions.UnknownUserException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;


@ControllerAdvice
public class RestExceptionHandler {

    @ExceptionHandler(value = {UnknownUserException.class})
    @ResponseBody
    public ResponseEntity<ErrorDTO> handleException(UnknownUserException ex) {
        return ResponseEntity
                .status(ex.getStatus())
                .body(new ErrorDTO(ex.getMessage()));
    }
}