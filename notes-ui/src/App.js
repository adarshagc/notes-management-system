import { useEffect, useState } from "react";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/notes")
      .then(res => res.json())
      .then(data => setNotes(data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>📒 Notes App</h1>

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