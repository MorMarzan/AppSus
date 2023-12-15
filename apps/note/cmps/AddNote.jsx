import { noteService } from '../services/note.service.js'
import { ColorPicker } from './ColorPicker.jsx'
import { EditBtns } from './EditBtns.jsx'
const { useState, useEffect, useRef, Fragment } = React

export function AddNote({ onAdd, noteToEdit, isOpen, onClose }) {
  const [note, setNote] = useState(noteService.getEmptyNote())
  const [isAddOpen, setIsAddOpen] = useState(isOpen)
  const [isColorOpen, setIsColorOpen] = useState(false)
  const addNoteRef = useRef()

  // function closeColor(ev) {
  //   setIsColorOpen(false)
  // }

  useEffect(() => {
    window.addEventListener('click', onCloseAdd)
    // addNoteRef.current.addEventListener('click', closeColor)

    return () => {
      window.removeEventListener('click', onCloseAdd)
      // addNoteRef.current.removeEventListener('click', closeColor)
    }
  }, [])

  useEffect(() => {
    if (noteToEdit) {
      setNote(noteToEdit)
    }
  }, [noteToEdit])

  function onOpenAdd() {
    if (!isAddOpen) setIsAddOpen(true)
  }

  function onCloseAdd() {
    if (onClose) {
      onClose()
      return
    }
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
        break

      case 'checkbox':
        value = target.checked
        break
    }

    if (field === 'txt' || field === 'title' || field === 'url') {
      handleInfoChange(field, value)
      return
    }

    refactorNote(field, value)
  }

  function refactorNote(field, val) {
    setNote((prevNote) => {
      return { ...prevNote, [field]: val }
    })
  }

  function handleInfoChange(field, value) {
    setNote((prevNote) => {
      const newInfo = { ...prevNote.info, [field]: value }
      return { ...prevNote, info: newInfo }
    })
  }

  function handleStyleChange(val) {
    setNote((prevNote) => {
      return { ...prevNote, style: { ...prevNote.style, backgroundColor: val } }
    })
  }

  function onAddNote(ev) {
    console.log('heree')
    ev.preventDefault()
    noteService.save(note).then((note) => {
      onCloseAdd()
      onAdd()
    })
  }

  function onPalletteClick(ev) {
    setIsColorOpen((colorOpen) => !colorOpen)
  }

  return (
    <section
      style={
        note.style
          ? { backgroundColor: note.style.backgroundColor }
          : { backgroundColor: 'white' }
      }
      className="add-note"
    >
      <section ref={addNoteRef} onClick={(ev) => ev.stopPropagation()}>
        {isAddOpen && (
          <i
            onClick={onCloseAdd}
            className="fa-solid fa-circle-xmark close-btn"
          ></i>
        )}
        <form onSubmit={onAddNote} className="add-note-form">
          {isAddOpen && (
            <Fragment>
              <img
                onClick={() => refactorNote('isPinned', !note.isPinned)}
                className="pin-img"
                src={`./assets/img/${
                  note.isPinned ? 'pinned' : 'unpinned'
                }.svg`}
              />
              <input
                value={note.info.title}
                onChange={handleNoteChange}
                name="title"
                type="text"
                placeholder="Title"
              />
            </Fragment>
          )}
          {note.type === 'NoteTxt' && (
            <input
              value={note.info.txt}
              onChange={handleNoteChange}
              onClick={onOpenAdd}
              name="txt"
              type="text"
              placeholder="Take a note..."
            />
          )}
          {note.type === 'NoteImg' && (
            <input
              value={note.info.url}
              onChange={handleNoteChange}
              onClick={onOpenAdd}
              name="url"
              type="url"
              placeholder="Enter image URL..."
            />
          )}
          {isAddOpen && (
            <div className="tool-bar">
              <EditBtns
                handleStyleChange={handleStyleChange}
                isColorOpen={isColorOpen}
                note={note}
                onPalletteClick={onPalletteClick}
              />
              <button
                className="add-btn"
                disabled={!note.info}
                onClick={onAddNote}
              >
                Add
              </button>
            </div>
          )}
        </form>
      </section>
    </section>
  )
}
