import { DynamicHeader } from '../../../cmps/DynamicHeader.jsx'
import { DynamicSidebar } from '../../../cmps/DynamicSidebar.jsx'
import { EditNote } from '../cmps/EditNote.jsx'
import { noteService } from '../services/note.service.js'
import { eventBusService } from '../../../services/event-bus.service.js'

const { Outlet, useSearchParams } = ReactRouterDOM

const { useState, useEffect } = React

export function NoteApp() {
  const [searchParams] = useSearchParams()
  const [searchValue, setSearchValue] = useState('')
  const [filterBy, setFilterBy] = useState(noteService.getEmptyFilterBy())
  const hasEditNoteParams = searchParams.has('edit-note')
  const [isSbOpen, setIsSbOpen] = useState(false)

  useEffect(() => {
    eventBusService.emit('filter-notes', filterBy)
  }, [filterBy])

  function onSetIsSbOpen() {
    setIsSbOpen((isSbOpen) => !isSbOpen)
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
    <section className="note-app page">
      <DynamicHeader
        onSetIsSbOpen={onSetIsSbOpen}
        searchValue={searchValue}
        onSearch={onSearch}
        filter={filterBy}
        onSetFilter={onSetFilter}
      />
      <DynamicSidebar isSbOpen={isSbOpen} onSetIsSbOpen={onSetIsSbOpen} />
      <div>
        <Outlet />
      </div>
      {hasEditNoteParams && <EditNote />}
    </section>
  )
}
