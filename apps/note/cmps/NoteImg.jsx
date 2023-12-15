export function NoteImg({ note }) {
  function isValidUrl(url) {
    // Regular expression to check if it's a valid file path or URL with an image extension
    const fileExtensionRegex = /\.(jpeg|jpg|gif|png|bmp)$/i
    const isUrl = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(url)
    return isUrl || fileExtensionRegex.test(url)
  }

  return (
    <article
      className="note-img"
      style={{ backgroundColor: note.style.backgroundColor }}
    >
      {note.info.title && <p className="note-title">{note.info.title}</p>}
      <img
        className="note-content"
        src={
          isValidUrl(note.info.url) ? note.info.url : './assets/img/keep.svg'
        }
        alt="Note Image"
      />
    </article>
  )
}
