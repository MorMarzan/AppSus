import { storageService } from '../../../services/async-storage.service.js'
import { AddNote } from '../cmps/AddNote.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
import { noteService } from '../services/note.service.js'

const { useState, useEffect } = React


export function NoteIndex() {
    const [notes, setNotes] = useState(null)
    const [filterBy, setFilterBy] = useState(null)
    

    useEffect(()=>{
        loadNotes()
      }, [filterBy])

      function loadNotes(){
        noteService.query(filterBy)
          .then(setNotes)
          .catch(err => console.log('err:', err))
      }

    return (
        <section className="note-index page">
        <AddNote onAdd={loadNotes} />
        <NoteList notes={notes} />
        </section>
    )
}
