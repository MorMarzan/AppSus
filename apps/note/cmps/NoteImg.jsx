export function NoteImg({note}) {
    return (
      <article 
      className="note-img"
      style={
        {backgroundColor: note.style.backgroundColor}
      }
      >
        {note.info.title && <p className="note-title">{note.info.title}</p>}
          <img className="note-content" src={note.info.url} />
      </article>
    )
  }
  