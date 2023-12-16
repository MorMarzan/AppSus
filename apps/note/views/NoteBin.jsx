import { eventBusService } from '../../../services/event-bus.service.js'
import { NoteList } from '../cmps/NoteList.jsx'
import { noteService } from '../services/note.service.js'
const { useState, useEffect, Fragment } = React

export function NoteBin() {
  const [notes, setNotes] = useState(null)
  const [filterBy, setFilterBy] = useState(noteService.getEmptyFilterBy())

  useEffect(() => {
    loadNotes()
  }, [filterBy])

  function loadNotes() {
    noteService
      .query(filterBy, true)
      .then((notes) => {
        setNotes(notes)
        eventBusService.emit('hide-loader')
      })
      .catch((err) => console.log('err:', err))
  }

  function onChangeNote(note) {
    if (!note) {
      loadNotes()
      return
    }
    noteService
      .save(note)
      .then(() => loadNotes())
      .catch((err) => console.log('err:', err))
  }

  return (
    <section className="note-bin">
      <div className="page-content">
        <NoteList notes={notes} onChangeNote={onChangeNote} />
      </div>
    </section>
  )
}
