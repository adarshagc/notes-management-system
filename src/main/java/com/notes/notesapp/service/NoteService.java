package com.notes.notesapp.service;

import com.notes.notesapp.model.Note;
import com.notes.notesapp.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class NoteService {

    @Autowired
    private NoteRepository repo;

    public List<Note> getAllNotes() {

        return repo.findAll();
    }

    public String addNote(Note note) {
        repo.save(note);
        return "Saved to Oracle DB!";
    }

    public String deleteNote(Long id) {
        if(repo.existsById(id)) {
            repo.deleteById(id);
            return "Note deleted successfully!";
        }else {
            return "Note not found!";
        }
    }
}
