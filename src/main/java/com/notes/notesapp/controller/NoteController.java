package com.notes.notesapp.controller;

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
    public String addNote(@RequestBody Note note) {
        return service.addNote(note);
    }
}
