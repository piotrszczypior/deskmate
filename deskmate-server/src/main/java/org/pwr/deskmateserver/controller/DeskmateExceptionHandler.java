package org.pwr.deskmateserver.controller;

import org.pwr.deskmateserver.dto.ErrorDTO;
import org.pwr.deskmateserver.exceptions.NotFoundException;
import org.pwr.deskmateserver.exceptions.UnknownUserException;
import org.pwr.deskmateserver.exceptions.UserAlreadyExistsException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

import java.util.Map;

@ControllerAdvice(annotations = RestController.class)
public class DeskmateExceptionHandler {
    private static final Map<Class<? extends Exception>, HttpStatus> statusMap = Map.ofEntries(
        Map.entry(NotFoundException.class, HttpStatus.NOT_FOUND),
        Map.entry(UserAlreadyExistsException.class, HttpStatus.CONFLICT),
        Map.entry(UnknownUserException.class, HttpStatus.BAD_REQUEST),
        Map.entry(Exception.class, HttpStatus.INTERNAL_SERVER_ERROR)
    );

    @ExceptionHandler
    public ResponseEntity<Object> handle(Exception e, WebRequest request) {
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        for(Class<?> exceptionClass : statusMap.keySet()) {
            if(exceptionClass.isInstance(e)) {
                   status = statusMap.get(exceptionClass);
            }
        }

        if(status == HttpStatus.INTERNAL_SERVER_ERROR) {
            return new ResponseEntity<>(new ErrorDTO("Internal server error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(new ErrorDTO(e.getMessage()), status);
    }
}
