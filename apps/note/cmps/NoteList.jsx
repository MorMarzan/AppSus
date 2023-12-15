const { useState, Fragment } = React
import { EditBtns } from './EditBtns.jsx'
import { NotePreview } from './NotePreview.jsx'
import { noteService } from '../services/note.service.js'
import { TrashBtns } from './TrashBtns.jsx'
const { useLocation } = ReactRouterDOM

export function NoteList({ notes, onChangeNote }) {
  const [noteHoverId, setNoteHoverId] = useState(null)
  const [isColorOpen, setIsColorOpen] = useState(false)
  const { pathname } = useLocation()
  const pageLoc = pathname.includes('notes') ? 'notes' : 'bin'

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

  function onDeleteNote(note) {
    noteService
      .moveToBin(note)
      .then(onChangeNote)
      .catch((err) => console.log('err', err))
  }

  function onDuplicateNote(note) {
    noteService
      .save({ ...note, id: '' })
      .then(onChangeNote)
      .catch((err) => console.log('err', err))
  }

  function handlePinClick(note) {
    noteService
      .save({ ...note, isPinned: !note.isPinned })
      .then(onChangeNote)
      .catch((err) => console.log('err', err))
  }

  if (!notes) return <h2 className="loading-msg">Loading...</h2>

  if (!notes.length) return <h2 className="loading-msg">No notes to display</h2>

  return (
    <section className="note-list">
      {notes.map((note) => {
        return (
          <article
            className={`note-list-item ${
              note.style &&
              note.style.backgroundColor === 'white' &&
              'note-border'
            }`}
            style={
              note.style && { backgroundColor: note.style.backgroundColor }
            }
            onMouseEnter={() => setNoteHoverId(note.id)}
            onMouseLeave={() => {
              setIsColorOpen(false)
              setNoteHoverId(null)
            }}
            key={note.id}
          >
            {noteHoverId === note.id && pageLoc === 'notes' && (
              <img
                onClick={() => handlePinClick(note)}
                className="pin-img"
                src={`./assets/img/${
                  note.isPinned ? 'pinned' : 'unpinned'
                }.svg`}
              />
            )}
            <NotePreview note={note} onChangeNote={onChangeNote} />

            {noteHoverId === note.id && pageLoc === 'notes' && (
              <EditBtns
                note={note}
                handleStyleChange={handleStyleChange}
                isColorOpen={isColorOpen}
                onPalletteClick={onPalletteClick}
                onDeleteNote={onDeleteNote}
                onDuplicateNote={onDuplicateNote}
              />
            )}

            {noteHoverId === note.id && pageLoc === 'bin' && <TrashBtns />}
          </article>
        )
      })}
    </section>
  )
}
