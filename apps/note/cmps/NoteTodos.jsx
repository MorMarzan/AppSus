export function NoteTodos({ note, onChangeNote }) {
  function onTodoClick(todoId) {
    var newTodos = note.info.todos
    const todoIdx = newTodos.findIndex((todo) => todo.id === todoId)
    const todo = newTodos[todoIdx]
    todo.doneAt = todo.doneAt ? null : Date.now()
    const newNote = { ...note, info: { ...note.info, todos: newTodos } }
    onChangeNote(newNote)
  }

  return (
    <article className="note-todos" onClick={(ev) => ev.stopPropagation()}>
      {note.info.title && <p className="note-title">{note.info.title}</p>}

      <ul className="note-todos-list note-content">
        {note.info.todos.map((todo) => {
          return (
            <li key={todo.id} className={`todo ${todo.doneAt && 'checked'}`}>
              <label>
                <input
                  onChange={() => onTodoClick(todo.id)}
                  type="checkbox"
                  checked={todo.doneAt ? true : false}
                />
                {todo.txt}
              </label>
            </li>
          )
        })}
      </ul>
    </article>
  )
}
