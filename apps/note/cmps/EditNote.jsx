const { useNavigate, useParams, Link } = ReactRouterDOM
const { useState, useEffect } = React

import { noteService } from '../services/note.service.js'
import { eventBusService } from '../../../services/event-bus.service.js'
import { AddNote } from './AddNote.jsx'

export function EditNote() {
  const [note, setNote] = useState(noteService.getEmptyNote())
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (params.noteId) loadNote()
  }, [])

  function loadNote() {
    noteService
      .get(params.noteId)
      .then(setNote)
      .catch((err) => console.log('err:', err))
  }

  function onSaveNote() {
    eventBusService.emit('load-notes', note.id)
  }

  function onClose() {
    navigate('/note')
  }

  function onDeleteNote() {
    noteService
      .remove(note.id)
      .then(() => {
        onSaveNote()
        onClose()
      })
      .catch((err) => console.log('err', err))
  }

  function onDuplicateNote(note) {
    noteService
      .save({ ...note, id: '' })
      .then(() => {
        onSaveNote()
        onClose()
      })
      .catch((err) => console.log('err', err))
  }

  return (
    <section className="edit-note">
      <div className="main-screen"></div>
      <div className="edit-note-container">
        <AddNote
          onAdd={onSaveNote}
          noteToEdit={note}
          isOpen={true}
          onClose={onClose}
          onDeleteNote={onDeleteNote}
          onDuplicateNote={onDuplicateNote}
        />
      </div>
    </section>
  )
}
