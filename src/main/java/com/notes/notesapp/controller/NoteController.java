package com.notes.notesapp.controller;

import org.springframework.web.bind.annotation.*;

import com.notes.notesapp.model.Note;

import java.util.ArrayList;
import java.util.List;



@RestController
@RequestMapping("/notes")
public class NoteController {

    private List<Note> notes = new ArrayList<>();

    @GetMapping
    public List<Note> getNotes() {
        return notes;
    }

    @PostMapping
    public String addNote(@RequestBody Note note) {
        notes.add(note);
        return "Note added successfully!";
    }
}
