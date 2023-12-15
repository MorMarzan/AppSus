const { useNavigate, useParams, useSearchParams } = ReactRouterDOM
const { useState, useEffect } = React

import { noteService } from '../services/note.service.js'
import { eventBusService } from '../../../services/event-bus.service.js'
import { AddNote } from './AddNote.jsx'

export function EditNote() {
  const [note, setNote] = useState(noteService.getEmptyNote())
  const [searchParams] = useSearchParams()
  const editNoteParam = searchParams.get('edit-note')
  const navigate = useNavigate()

  useEffect(() => {
    if (editNoteParam) loadNote()
  }, [])

  function loadNote() {
    noteService
      .get(editNoteParam)
      .then(setNote)
      .catch((err) => console.log('err:', err))
  }

  function onSaveNote() {
    eventBusService.emit('load-notes', note.id)
  }

  function onDeleteNote() {
    noteService
      .remove(note.id)
      .then(() => {
        onSaveNote()
        onCloseEdit()
      })
      .catch((err) => console.log('err', err))
  }

  function onDuplicateNote(note) {
    noteService
      .save({ ...note, id: '' })
      .then(() => {
        onSaveNote()
        onCloseEdit()
      })
      .catch((err) => console.log('err', err))
  }

  function onCloseEdit() {
    navigate('')
  }

  return (
    <section className="edit-note">
      <div className="main-screen"></div>
      <div className="edit-note-container">
        <AddNote
          onAdd={onSaveNote}
          noteToEdit={note}
          isOpen={true}
          onClose={onCloseEdit}
          onDeleteNote={onDeleteNote}
          onDuplicateNote={onDuplicateNote}
        />
      </div>
    </section>
  )
}
