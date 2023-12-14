import { DynamicHeader } from '../../../cmps/DynamicHeader.jsx'
import { DynamicSidebar } from '../../../cmps/DynamicSidebar.jsx'
import { eventBusService } from '../../../services/event-bus.service.js'
import { AddNote } from '../cmps/AddNote.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
import { noteService } from '../services/note.service.js'

const { Outlet } = ReactRouterDOM
const { useState, useEffect } = React

export function NoteIndex() {
  const [notes, setNotes] = useState(null)
  const [filterBy, setFilterBy] = useState(noteService.getEmptyFilterBy())
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [isSbOpen, setIsSbOpen] = useState(!(windowWidth <= 768)) //intialize sb to be closed on mobile
  const [isSbFull, setIsSbFull] = useState(true) /* desktop only */
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    // Set initial window width
    setWindowWidth(window.innerWidth)
    // Add event listener for window resize
    window.addEventListener('resize', handleResize)

    const unsubscribe = eventBusService.on('load-notes', loadNotes)

    return () => {
      unsubscribe()
      window.removeEventListener('resize', handleResize)
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

  function handleResize() {
    setWindowWidth(window.innerWidth)
  }

  function onSetIsSbFull() {
    setIsSbFull((isSbFull) => !isSbFull)
  }

  function onSearch({ target }) {
    const search = target.value
    setSearchValue(search)
    setFilterBy((prevFilter) => ({ ...prevFilter, txt: search }))
  }

  function onSetFilter(filter) {
    setFilterBy((prevFilter) => ({ ...prevFilter, ...filter }))
  }

  return (
    <section className="note-index ">
      <DynamicHeader
        onSetIsSbFull={onSetIsSbFull}
        searchValue={searchValue}
        onSearch={onSearch}
        filter={filterBy}
        onSetFilter={onSetFilter}
      />

      <div className="page-layout page">
        <DynamicSidebar isSbFull={isSbFull} />
        <div className="page-content">
          <AddNote onAdd={loadNotes} />
          <NoteList onChangeNote={loadNotes} notes={notes} />
          <Outlet />
        </div>
      </div>
    </section>
  )
}
