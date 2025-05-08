package org.pwr.deskmateserver.controller;

import org.pwr.deskmateserver.dto.ErrorDTO;
import org.pwr.deskmateserver.exceptions.CollisionException;
import org.pwr.deskmateserver.exceptions.NotFoundException;
import org.pwr.deskmateserver.exceptions.UnknownUserException;
import org.pwr.deskmateserver.exceptions.UserAlreadyExistsException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

import java.util.LinkedHashMap;
import java.util.Map;

@ControllerAdvice(annotations = RestController.class)
public class DeskmateExceptionHandler {
    private static final Map<Class<? extends Exception>, HttpStatus> statusMap;

    static {
        Map<Class<? extends Exception>, HttpStatus> map = new LinkedHashMap<>();
        map.put(NotFoundException.class, HttpStatus.NOT_FOUND);
        map.put(UserAlreadyExistsException.class, HttpStatus.CONFLICT);
        map.put(UnknownUserException.class, HttpStatus.BAD_REQUEST);
        map.put(CollisionException.class, HttpStatus.CONFLICT);
        map.put(Exception.class, HttpStatus.INTERNAL_SERVER_ERROR);
        statusMap = map;
    }

    private final Logger logger = LoggerFactory.getLogger(DeskmateExceptionHandler.class);

    @ExceptionHandler
    public ResponseEntity<Object> handle(Exception e, WebRequest request) {
        logger.error("Error", e);
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        for(Class<?> exceptionClass : statusMap.keySet()) {
            if(exceptionClass.isInstance(e)) {
               status = statusMap.get(exceptionClass);
               break;
            }
        }

        if(status == HttpStatus.INTERNAL_SERVER_ERROR) {
            return new ResponseEntity<>(new ErrorDTO("Internal server error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(new ErrorDTO(e.getMessage()), status);
    }
}
