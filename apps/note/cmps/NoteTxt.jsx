import { EditBtns } from './EditBtns.jsx'
import { noteService } from '../services/note.service.js'

const { useState, useEffect, useRef, Fragment } = React

export function NoteTxt({ note, onChangeNote }) {
  const [displayedNote, setDisplayedNote] = useState(note)
  const [isColorOpen, setIsColorOpen] = useState(false)

  useEffect(() => {
    onChangeNote()
  }, [displayedNote])

  function handleStyleChange(color) {
    setDisplayedNote((prevNote) => {
      return {
        ...prevNote,
        style: { ...prevNote.style, backgroundColor: color },
      }
    })
  }

  return (
    <article className="note-txt">
      {note.info.title && <p className="note-title">{note.info.title}</p>}
      <p className="note-content">{note.info.txt}</p>
    </article>
  )
}
