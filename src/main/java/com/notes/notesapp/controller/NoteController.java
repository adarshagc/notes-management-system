package com.notes.notesapp.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.notes.notesapp.model.Note;
import com.notes.notesapp.service.NoteService;

import java.util.ArrayList;
import java.util.List;



@RestController
@RequestMapping("/notes")
public class NoteController {

    @Autowired
    private NoteService service;

    @GetMapping
    public List<Note> getNotes() {
        return service.getAllNotes();
    }

    @PostMapping
    public String addNote(@Valid @RequestBody Note note) {
        return service.addNote(note);
    }

    @DeleteMapping("/{id}")
    public String deleteNote(@PathVariable Long id) {
        return service.deleteNote(id);
    }

    @PutMapping("/{id}")
    public String updateNote(@PathVariable Long id, @Valid @RequestBody Note note) {
        return service.updateNote(id, note);
    }
}
