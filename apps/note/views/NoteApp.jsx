// import { NoteIndex } from './apps/note/views/NoteIndex.jsx'
// import { EditNote } from './apps/note/cmps/EditNote.jsx'
import { DynamicHeader } from '../../../cmps/DynamicHeader.jsx'
import { DynamicSidebar } from '../../../cmps/DynamicSidebar.jsx'
import { EditNote } from '../cmps/EditNote.jsx'
import { noteService } from '../services/note.service.js'

const { Outlet, useSearchParams } = ReactRouterDOM

const { useState } = React

export function NoteApp() {
  const [searchValue, setSearchValue] = useState('')
  const [searchParams] = useSearchParams()
  const [filterBy, setFilterBy] = useState(noteService.getEmptyFilterBy())
  const hasEditNoteParams = searchParams.has('edit-note')
  const [isSbOpen, setIsSbOpen] = useState(false)

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
