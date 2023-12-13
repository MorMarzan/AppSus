export function NoteImg({note}) {
    return (
      <article 
      className="note-img"
      style={
        {backgroundColor: note.style.backgroundColor}
      }
      >
        {note.info.title && <h2>{note.info.title}</h2>}
          <img src={note.info.url} />
      </article>
    )
  }
  