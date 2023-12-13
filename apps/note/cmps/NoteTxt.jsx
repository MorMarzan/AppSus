
export function NoteTxt({note}) {
  return (
    <article 
    className="note-txt" 
    >
      {note.info.title && <p className="note-title">{note.info.title}</p>}
        <p className="note-content">{note.info.txt}</p>
    </article>
  )
}
