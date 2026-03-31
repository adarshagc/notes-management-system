package com.notes.notesapp.service;

import com.notes.notesapp.model.Note;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class NoteService {

    private List<Note> notes = new ArrayList<>();

    public List<Note> getAllNotes() {
        return notes;
    }

    public String addNote(Note note) {
        notes.add(note);
        return "Note added successfully!";
    }
}
