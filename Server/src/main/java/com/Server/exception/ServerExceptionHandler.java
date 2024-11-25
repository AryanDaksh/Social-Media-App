package com.Server.exception;

import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import java.time.format.DateTimeParseException;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.HashMap;
import java.util.Map;
import org.springframework.http.converter.HttpMessageNotReadableException;

@RestControllerAdvice(annotations = RestController.class)
public class ServerExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Object> handleIllegalArgException(IllegalArgumentException e) {

        HttpStatus notFound = HttpStatus.NOT_FOUND;

        ApiException apiException = new ApiException(e.getMessage(), ZonedDateTime.now(ZoneId.of("Asia/Kolkata"))
        );
        return new ResponseEntity<>(apiException, notFound);
    }

    @ExceptionHandler(DateTimeParseException.class)
    public ResponseEntity<Object> handleDateTimeParseException(DateTimeParseException e) {

        HttpStatus badRequest = HttpStatus.BAD_REQUEST;

        ApiException apiException = new ApiException(e.getMessage(), ZonedDateTime.now(ZoneId.of("Asia/Kolkata"))
        );
        return new ResponseEntity<>(apiException, badRequest);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Object> handleHttpMsgException(HttpMessageNotReadableException e) {

        HttpStatus badRequest = HttpStatus.BAD_REQUEST;

        ApiException apiException = new ApiException(e.getMessage(), ZonedDateTime.now(ZoneId.of("Asia/Kolkata"))
        );
        return new ResponseEntity<>(apiException, badRequest);
    }

    @ExceptionHandler(NoSuchFieldException.class)
    public ResponseEntity<Object> handleNoFieldException(NoSuchFieldException e) {

        HttpStatus notFound = HttpStatus.NOT_FOUND;

        ApiException apiException = new ApiException(e.getMessage(), ZonedDateTime.now(ZoneId.of("Asia/Kolkata"))
        );
        return new ResponseEntity<>(apiException, notFound);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<Object> handleConstraintException(ConstraintViolationException e) {

        HttpStatus badRequest = HttpStatus.BAD_REQUEST;

        ApiException apiException = new ApiException(e.getMessage(), ZonedDateTime.now(ZoneId.of("Asia/Kolkata"))
        );
        return new ResponseEntity<>(apiException, badRequest);
    }

}
