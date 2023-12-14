const { useNavigate, useParams, Link } = ReactRouterDOM
const { useState, useEffect } = React

import { noteService } from '../services/note.service.js'
import { AddNote } from "./AddNote.jsx";

export function EditNote() {
  const [note, setNote] = useState(noteService.getEmptyNote())
  const params = useParams()

  useEffect(()=>{
    if(params.noteId) loadNote()
  }, [])

  function loadNote() {
    noteService.get(params.noteId)
      .then(setNote)
      .catch(err=>console.log('err:', err))
  }

  return (
    <section className="edit-note">
      <div className="main-screen"></div>
      <AddNote noteToEdit={note}  />
    </section>
  )
}
