export function NoteVideo({note}) {
    return (
      <article 
      className="note-video"
      style={note.style ? { backgroundColor: note.style.backgroundColor } : {}}
      >
          <h2>{note.type}</h2>
      </article>
    )
  }