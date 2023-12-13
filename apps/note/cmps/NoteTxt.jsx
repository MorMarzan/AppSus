

export function NoteTxt({note}) {
  return (
    <article 
    className="note-txt" 
    style={
      {backgroundColor: note.style.backgroundColor}
    }
    >
        <h2>{note.info.txt}</h2>
    </article>
  )
}
