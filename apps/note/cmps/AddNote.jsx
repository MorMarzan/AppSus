import { noteService } from '../services/note.service.js'
const { useState, useEffect, Fragment } = React

export function AddNote({onAdd}) {
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [note, setNote] = useState(noteService.getEmptyNote())

    useEffect(() => {
        window.addEventListener('click', onCloseAdd)

        return () => {
            window.removeEventListener('click', onCloseAdd)
        }
    }, [])

    function onOpenAdd() {
      if(!isAddOpen) setIsAddOpen(true)
    }

    function onCloseAdd() {
      setIsAddOpen(false)
      setNote(noteService.getEmptyNote())
    }

    function handleNoteChange({ target }) {
      var field = target.name
      let value = target.value
  
      switch (target.type) {
        case 'number':
        case 'range':
          value = +value
        break;
  
        case 'checkbox':
          value = target.checked
          break
        }
  
        if(field === 'txt' || field === 'title') {
          handleInfoChange(field, value)
          return
        }
  
        refactorNote(field, value)
  }

  function refactorNote(field, val) {
    setNote(prevNote => {
      return ({ ...prevNote, [field]: val })
    })
  }

  function handleInfoChange(field, value) {
    setNote(prevNote => {
    const newInfo = {...prevNote.info, [field]: value }
    return ({ ...prevNote, info: newInfo})
  })
  }

  function onAddNote(ev){
    ev.preventDefault()
    noteService.save(note)
      .then(note => {
        onCloseAdd()
        onAdd()
      })
  }

  return (
    <section onClick={ev => ev.stopPropagation()} className="add-note">
      {isAddOpen && <i onClick={onCloseAdd} className="fa-solid fa-circle-xmark close-btn"></i>}
      <form onSubmit={onAddNote} className='add-note-form'>
        {isAddOpen && 
        <Fragment>
          <img onClick={() => refactorNote('isPinned', !note.isPinned)} className='pin-img' src={`../../../assets/img/${note.isPinned ? 'pinned' : 'unpinned'}.svg`}/>
        <input value={note.info.title} onChange={handleNoteChange} name='title' type="text" placeholder="Title"/>
         </Fragment>
         }
        <input value={note.info.txt} onChange={handleNoteChange} onClick={onOpenAdd} name='txt' type="text" placeholder="Take a note..." />
        {isAddOpen && 
        <div className="tool-bar">
          <div className="edit-btns">
            <div className="img-container">
            <img src="../../../assets/img/color-palette.svg"/>
            </div>
          </div>
        <button className='add-btn' disabled={!note.info.txt} onClick={onAddNote}>Add</button>
        </div>
        }
        </form>
    </section>
  )
}
