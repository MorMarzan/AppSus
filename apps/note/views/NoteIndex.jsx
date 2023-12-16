import { eventBusService } from '../../../services/event-bus.service.js'
import { AddNote } from '../cmps/AddNote.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
import { noteService } from '../services/note.service.js'

const { Outlet } = ReactRouterDOM
const { useState, useEffect, Fragment } = React

export function NoteIndex() {
  const [notes, setNotes] = useState(null)
  const [filterBy, setFilterBy] = useState(noteService.getEmptyFilterBy())

  useEffect(() => {
    const unsubscribeLoad = eventBusService.on('load-notes', loadNotes)
    const unsubscribeFilter = eventBusService.on('filter-notes', setFilterBy)

    return () => {
      unsubscribeLoad()
      unsubscribeFilter()
    }
  }, [])

  useEffect(() => {
    loadNotes()
  }, [filterBy])

  function loadNotes() {
    eventBusService.emit('show-loader')
    noteService
      .query(filterBy)
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
    // eventBusService.emit('show-loader')
    noteService
      .save(note)
      .then(() => {
        loadNotes()
      })
      .catch((err) => console.log('err:', err))
  }

  return (
    <section className="note-index ">
      <div className="page-content">
        <AddNote onAdd={loadNotes} />
        {notes && (
          <Fragment>
            {notes.some((note) => note.isPinned) ? (
              <Fragment>
                <p className="list-header">PINNED</p>
                <NoteList
                  onChangeNote={onChangeNote}
                  notes={notes.filter((note) => note.isPinned)}
                />
                <p className="list-header">OTHERS</p>
                <NoteList
                  onChangeNote={onChangeNote}
                  notes={notes.filter((note) => !note.isPinned)}
                />
              </Fragment>
            ) : (
              <NoteList onChangeNote={onChangeNote} notes={notes} />
            )}
          </Fragment>
        )}
        <Outlet />
      </div>
    </section>
  )
}
