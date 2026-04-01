import { useEffect, useState } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = () => {
    fetch("http://localhost:8080/notes")
      .then(res => res.json())
      .then(data => setNotes(data));
  };

  const addNote = () => {
    fetch("http://localhost:8080/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, content })
    })
      .then(() => {
        setTitle("");
        setContent("");
        fetchNotes(); // refresh list
      });
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
        <button onClick={addNote}>Add Note</button>
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
        </div>
      ))}
    </div>
  );
}

export default App;