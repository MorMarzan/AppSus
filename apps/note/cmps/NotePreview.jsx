import { NoteImg } from './NoteImg.jsx'
import { NoteTodos } from './NoteTodos.jsx'
import { NoteTxt } from './NoteTxt.jsx'
import { NoteVideo } from './NoteVideo.jsx'

const { useState } = React
const { Link, useNavigate } = ReactRouterDOM

export function NotePreview({ note, onChangeNote }) {
  const navigate = useNavigate()

  function openEditNote(ev) {
    ev.stopPropagation()
    navigate({
      search: `?edit-note=${note.id}`,
    })
  }

  return (
    <article onClick={openEditNote} className="note-preview">
      <DynamicCmp note={note} onChangeNote={onChangeNote} />
    </article>
  )
}

function DynamicCmp(props) {
  switch (props.note.type) {
    case 'NoteTxt':
      return <NoteTxt note={props.note} onChangeNote={props.onChangeNote} />
    case 'NoteImg':
      return <NoteImg note={props.note} onChangeNote={props.onChangeNote} />
    case 'NoteVideo':
      return <NoteVideo note={props.note} onChangeNote={props.onChangeNote} />
    case 'NoteTodos':
      return <NoteTodos note={props.note} onChangeNote={props.onChangeNote} />
  }
}
