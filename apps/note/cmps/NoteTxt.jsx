
export function NoteTxt({note}) {
  return (
    <article 
    className="note-txt" 
    >
      {note.info.title && <h2>{note.info.title}</h2>}
        <p>{note.info.txt}</p>
    </article>
  )
}
