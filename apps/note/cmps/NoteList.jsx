const { useState, Fragment } = React
import { EditBtns } from './EditBtns.jsx'
import { NotePreview } from './NotePreview.jsx'
import { noteService } from '../services/note.service.js'

export function NoteList({ notes, onChangeNote }) {
  const [noteHoverId, setNoteHoverId] = useState(null)
  const [isColorOpen, setIsColorOpen] = useState(false)

  function handleStyleChange(color, note) {
    const newNote = {
      ...note,
      style: { ...note.style, backgroundColor: color },
    }

    noteService
      .save(newNote)
      .then(onChangeNote)
      .catch((err) => console.log('err', err))
  }

  function onPalletteClick(ev) {
    setIsColorOpen((colorOpen) => !colorOpen)
  }

  function onDeleteNote(noteId) {
    noteService
      .remove(noteId)
      .then(onChangeNote)
      .catch((err) => console.log('err', err))
  }

  if (!notes || !notes.length)
    return <h2 className="loading-msg">Loading...</h2>
  return (
    <section className="note-list">
      {notes.map((note) => {
        return (
          <article
            className="note-list-item"
            style={
              note.style ? { backgroundColor: note.style.backgroundColor } : {}
            }
            onMouseEnter={() => setNoteHoverId(note.id)}
            onMouseLeave={() => {
              setIsColorOpen(false)
              setNoteHoverId(null)
            }}
            key={note.id}
          >
            <NotePreview note={note} onChangeNote={onChangeNote} />

            {noteHoverId === note.id && (
              <EditBtns
                note={note}
                handleStyleChange={handleStyleChange}
                isColorOpen={isColorOpen}
                onPalletteClick={onPalletteClick}
                onDeleteNote={onDeleteNote}
              />
            )}
          </article>
        )
      })}
    </section>
  )
}
