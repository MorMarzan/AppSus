const { useState, Fragment } = React
import { EditBtns } from './EditBtns.jsx'
import { NotePreview } from './NotePreview.jsx'
import { noteService } from '../services/note.service.js'
import { TrashBtns } from './TrashBtns.jsx'
import { eventBusService } from '../../../services/event-bus.service.js'
const { useLocation, useNavigate } = ReactRouterDOM

export function NoteList({ notes, onChangeNote }) {
  const [noteHoverId, setNoteHoverId] = useState(null)
  const [isColorOpen, setIsColorOpen] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const pageLoc = pathname.includes('notes') ? 'notes' : 'bin'

  function handleStyleChange(color, note) {
    eventBusService.emit('show-loader')
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
    eventBusService.emit('show-loader')
    noteService
      .moveToBin(note)
      .then(onChangeNote)
      .catch((err) => console.log('err', err))
  }

  function onDeleteForever(noteId) {
    eventBusService.emit('show-loader')
    return noteService
      .remove(noteId, true)
      .then(onChangeNote)
      .catch((err) => console.log('err', err))
  }

  function onRestoreNote(note) {
    eventBusService.emit('show-loader')
    return noteService
      .remove(note.id, true)
      .then(() => {
        noteService.save(note, true).then(onChangeNote)
      })
      .catch((err) => console.log('err', err))
  }

  function onDuplicateNote(note) {
    eventBusService.emit('show-loader')
    noteService
      .save({ ...note, id: '' })
      .then(onChangeNote)
      .catch((err) => console.log('err', err))
  }

  function handlePinClick(note, ev) {
    eventBusService.emit('show-loader')
    ev.stopPropagation()
    noteService
      .save({ ...note, isPinned: !note.isPinned })
      .then(onChangeNote)
      .catch((err) => console.log('err', err))
  }

  function onSendMail(note) {
    navigate({
      pathname: '/mail/inbox',
      search: `?compose=note&subject=${note.info.title}&body=${getNoteBody(
        note
      )}`,
    })
  }

  function getNoteBody(note) {
    switch (note.type) {
      case 'NoteTxt':
        return note.info.txt

      case 'NoteImg':
      case 'NoteVideo':
        return note.info.url

      case 'NoteTodos':
        return note.info.todos.map((todo) => todo.txt)
    }
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
                onClick={(ev) => handlePinClick(note, ev)}
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
                onSendMail={onSendMail}
              />
            )}

            {noteHoverId === note.id && pageLoc === 'bin' && (
              <TrashBtns
                note={note}
                onDeleteForever={onDeleteForever}
                onRestoreNote={onRestoreNote}
              />
            )}
          </article>
        )
      })}
    </section>
  )
}
