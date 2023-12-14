import { eventBusService } from '../../../services/event-bus.service.js'
import { AddNote } from '../cmps/AddNote.jsx'
import { NoteHeader } from '../cmps/NoteHeader.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
import { noteService } from '../services/note.service.js'

const { Outlet } = ReactRouterDOM
const { useState, useEffect } = React

export function NoteIndex() {
  const [notes, setNotes] = useState(null)
  const [filterBy, setFilterBy] = useState(null)

  useEffect(() => {
    const unsubscribe = eventBusService.on('load-notes', loadNotes)

    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    loadNotes()
  }, [filterBy])

  function loadNotes() {
    noteService
      .query(filterBy)
      .then(setNotes)
      .catch((err) => console.log('err:', err))
  }

  return (
    <section className="note-index page">
      <NoteHeader />
      <AddNote onAdd={loadNotes} />
      <NoteList onChangeNote={loadNotes} notes={notes} />
      <Outlet />
    </section>
  )
}
