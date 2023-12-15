import { EditBtns } from './EditBtns.jsx'
import { noteService } from '../services/note.service.js'

const { useState, useEffect, useRef, Fragment } = React

export function NoteTxt({ note }) {
  return (
    <article className="note-txt">
      {note.info.title && <p className="note-title">{note.info.title}</p>}
      <p className="note-content">{note.info.txt || 'EMPTY NOTE'}</p>
    </article>
  )
}
