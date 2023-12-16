const { useState, useEffect } = React
import { eventBusService } from '../../../services/event-bus.service.js'

export function NoteImg({ note }) {
  const [isImgLoaded, setIsImgLoaded] = useState(false)

  useEffect(() => {
    const unsubscribe = eventBusService.on('load-notes', (noteId) => {
      if (noteId === note.id) setIsImgLoaded(false)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <article
      className="note-img"
      style={{ backgroundColor: note.style.backgroundColor }}
    >
      {note.info.title && <p className="note-title">{note.info.title}</p>}

      <img
        className={`note-content ${!isImgLoaded && 'hide'}`}
        onLoad={() => setIsImgLoaded(true)}
        src={note.info.url}
      />
      {!isImgLoaded && (
        <img
          className="note-content note-alt-img"
          src="./assets/img/keep.svg"
        />
      )}
    </article>
  )
}
