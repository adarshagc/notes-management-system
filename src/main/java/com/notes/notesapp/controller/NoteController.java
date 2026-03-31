package com.notes.notesapp.controller;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/notes")
public class NoteController {

    private List<String> notes = new ArrayList<>();

    @GetMapping
    public List<String> getNotes() {
        return notes;
    }

    @PostMapping
    public String addNote(@RequestBody String note) {
        notes.add(note);
        return "Note added successfully!";
    }
}
