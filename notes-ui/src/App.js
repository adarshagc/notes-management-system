import { useEffect, useState } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = () => {
    fetch("http://localhost:8080/notes")
      .then(res => res.json())
      .then(data => setNotes(data));
  };

  const saveNote = () => {
    const url = editingId
      ? `http://localhost:8080/notes/${editingId}`
      : "http://localhost:8080/notes";

    const method = editingId ? "PUT" : "POST";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, content })
    })
      .then(() => {
        setTitle("");
        setContent("");
        setEditingId(null);
        fetchNotes();
      });
  };

  const deleteNote = (id) => {
    fetch(`http://localhost:8080/notes/${id}`, {
      method: "DELETE"
    })
      .then(() => fetchNotes());
  };

  const handleEdit = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingId(note.id);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>📒 Notes App</h1>

      {/* FORM */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br /><br />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <br /><br />
        <button onClick={saveNote}>
          {editingId ? "Update Note" : "Add Note"}
        </button>
      </div>

      {/* NOTES LIST */}
      {notes.map(note => (
        <div
          key={note.id}
          style={{
            border: "1px solid gray",
            margin: "10px",
            padding: "10px",
            borderRadius: "8px"
          }}
        >
          <h3>{note.title}</h3>
          <p>{note.content}</p>

          <button onClick={() => deleteNote(note.id)}>
            Delete
          </button>
          <button onClick={() => handleEdit(note)}>
            Edit
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;