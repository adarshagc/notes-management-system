import { useEffect, useState } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = () => {
    setLoading(true);

    fetch("https://notes-management-system-1-n10m.onrender.com/notes")
      .then(res => res.json())
      .then(data => {
        setNotes(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const saveNote = () => {
    const url = editingId
      ? `https://notes-management-system-1-n10m.onrender.com/notes/${editingId}`
      : "https://notes-management-system-1-n10m.onrender.com/notes";

    const method = editingId ? "PUT" : "POST";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, content })
    })
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message);
        }
        return res.json();
      })
      .then(() => {
        setSuccess(editingId ? "Note updated!" : "Note added!");
        setError("");
        setTitle("");
        setContent("");
        setEditingId(null);
        fetchNotes();
      })
      .catch(err => {
        setError(err.message);
        setSuccess("");
      });
  };

  const deleteNote = (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    fetch(`https://notes-management-system-1-n10m.onrender.com/notes/${id}`, {
      method: "DELETE"
    })
      .then(() => {
        setSuccess("Note deleted!");
        fetchNotes();
      });
  };

  const handleEdit = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingId(note.id);
    setSuccess("");
    setError("");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>📒 Notes App</h1>

      {/* ERROR / SUCCESS */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      {/* FORM */}
      <div style={{ marginBottom: "20px" }}>
        <input
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          style={{
            padding: "10px",
            width: "100%",
            background: editingId ? "orange" : "blue",
            color: "white",
            border: "none",
            borderRadius: "5px"
          }}
          onClick={saveNote}
        >
          {editingId ? "Update Note" : "Add Note"}
        </button>
      </div>

      {/* LOADING */}
      {loading && <p>Loading...</p>}

      {/* NOTES LIST */}
      {notes.map(note => (
        <div
          key={note.id}
          style={{
            border: "1px solid #ddd",
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "8px",
            background: "#f9f9f9"
          }}
        >
          <h3>{note.title}</h3>
          <p>{note.content}</p>

          <button
            style={{ marginRight: "10px" }}
            onClick={() => handleEdit(note)}
          >
            Edit
          </button>

          <button
            style={{ background: "red", color: "white" }}
            onClick={() => deleteNote(note.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;