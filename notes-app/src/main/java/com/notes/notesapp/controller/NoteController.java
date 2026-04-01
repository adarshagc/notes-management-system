package com.notes.notesapp.controller;

import com.notes.notesapp.dto.ApiResponse;
import com.notes.notesapp.exception.ResourceNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.notes.notesapp.model.Note;
import com.notes.notesapp.service.NoteService;

import java.util.ArrayList;
import java.util.List;



@RestController
@RequestMapping("/notes")
@CrossOrigin(origins = "https://notes-management-system.netlify.app")
public class NoteController {

    @Autowired
    private NoteService service;

    @GetMapping
    public List<Note> getNotes() {
        return service.getAllNotes();
    }

    @PostMapping
    public ResponseEntity<ApiResponse> addNote(@Valid @RequestBody Note note) {
        service.addNote(note);
        return new ResponseEntity<>(new ApiResponse("Note created successfully", 201), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteNote(@PathVariable Long id) {
        service.deleteNote(id);
        return ResponseEntity.ok(new ApiResponse("Note deleted successfully!", 200));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateNote(@PathVariable Long id, @Valid @RequestBody Note note) {
        service.updateNote(id, note);
        return ResponseEntity.ok(new ApiResponse("Note updated successfully!", 200));
    }
}
