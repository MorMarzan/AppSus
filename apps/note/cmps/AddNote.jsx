import { noteService } from '../services/note.service.js'
import { ColorPicker } from './ColorPicker.jsx'
import { EditBtns } from './EditBtns.jsx'
import { NoteTypeBar } from './NoteTypeBar.jsx'
const { useState, useEffect, useRef, Fragment } = React

export function AddNote({
  onAdd,
  noteToEdit,
  isOpen,
  onClose,
  onDeleteNote,
  onDuplicateNote,
}) {
  const [note, setNote] = useState(noteService.getEmptyNote('NoteTxt', ''))
  const [isAddOpen, setIsAddOpen] = useState(isOpen)
  const [isColorOpen, setIsColorOpen] = useState(false)
  const [newTodo, setNewTodo] = useState(noteService.getEmptyTodo())
  const addNoteRef = useRef()

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
    setNote(noteService.getEmptyNote('NoteTxt', ''))
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
    ev.preventDefault()
    noteService.save(note).then((note) => {
      onCloseAdd()
      onAdd()
    })
  }

  function onPalletteClick(ev) {
    setIsColorOpen((colorOpen) => !colorOpen)
  }

  function changeNoteType(type) {
    setNote((prevNote) => noteService.getEmptyNote(type, prevNote.title))
    setNewTodo(noteService.getEmptyTodo())
  }

  function onAddTodo() {
    if (!newTodo.txt) return
    var todos = note.info.todos
    todos.push(newTodo)
    onAdd()
    setNewTodo(noteService.getEmptyTodo())
  }

  function onChangeNewTodo(ev) {
    setNewTodo((prevTodo) => ({ ...prevTodo, txt: ev.target.value }))
  }

  function onTodoClick(todoId) {
    var newTodos = note.info.todos
    const todoIdx = newTodos.findIndex((todo) => todo.id === todoId)
    const todo = newTodos[todoIdx]
    todo.doneAt = todo.doneAt ? null : Date.now()
    const newNote = { ...note, info: { ...note.info, todos: newTodos } }
    setNote(newNote)
  }

  function onDeleteTodo(todoId) {
    var newTodos = note.info.todos
    const todoIdx = newTodos.findIndex((todo) => todo.id === todoId)
    const newNote = { ...note }
    newNote.info.todos.splice(todoIdx, 1)
    setNote(newNote)
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
          <div className="note-content">
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
            {note.type === 'NoteVideo' && (
              <input
                value={note.info.url}
                onChange={handleNoteChange}
                onClick={onOpenAdd}
                name="url"
                type="url"
                placeholder="Enter video URL..."
              />
            )}
            {note.type === 'NoteTodos' && (
              <Fragment>
                {isAddOpen && (
                  <ul className="note-todos-list">
                    {note.info.todos.map((todo) => {
                      return (
                        <li
                          key={todo.id}
                          className={`todo ${todo.doneAt && 'checked'}`}
                        >
                          <label>
                            <input
                              onChange={() => onTodoClick(todo.id)}
                              type="checkbox"
                              checked={todo.doneAt ? true : false}
                            />
                            {todo.txt}
                          </label>
                          <img
                            onClick={() => onDeleteTodo(todo.id)}
                            src="./assets/img/close.svg"
                          />
                        </li>
                      )
                    })}
                  </ul>
                )}
                <div className="add-todo">
                  <div className="new-todo-container">
                    {!isAddOpen && <input type="checkbox" />}
                    {isAddOpen && (
                      <input
                        onChange={() => {
                          setNewTodo((prevTodo) => ({
                            ...prevTodo,
                            doneAt: prevTodo.doneAt ? null : Date.now(),
                          }))
                        }}
                        type="checkbox"
                        checked={newTodo.doneAt ? true : false}
                      />
                    )}
                    <input
                      className={`todo ${newTodo.doneAt && 'checked'}`}
                      onChange={onChangeNewTodo}
                      value={newTodo.txt}
                      type="text"
                      placeholder="Add a todo"
                      onClick={onOpenAdd}
                    />
                  </div>
                  {isAddOpen && (
                    <img onClick={onAddTodo} src="./assets/img/add.svg" />
                  )}
                </div>
              </Fragment>
            )}

            {!isAddOpen && (
              <NoteTypeBar noteType={note.type} onChangeType={changeNoteType} />
            )}
          </div>
          {isAddOpen && (
            <div className="tool-bar">
              <EditBtns
                handleStyleChange={handleStyleChange}
                isColorOpen={isColorOpen}
                note={note}
                onPalletteClick={onPalletteClick}
                onDeleteNote={onDeleteNote}
                onDuplicateNote={onDuplicateNote}
              />
              <div className="note-type-container">
                <NoteTypeBar
                  noteType={note.type}
                  onChangeType={changeNoteType}
                />
              </div>
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
