package com.notes.notesapp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.notes.notesapp.dto.ApiResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse> handleNotFound(ResourceNotFoundException ex) {
        ApiResponse response = new ApiResponse(ex.getMessage(), 404);
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }
}
