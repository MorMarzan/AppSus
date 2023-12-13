export function NoteTodos({note}) {

    return (
      <article 
      className="note-todos"
      >
        {note.info.title && <p className="note-title">{note.info.title}</p>}

        <ul className="note-todos-list note-content">
          {note.info.todos.map((todo, idx) => {
            return <li key={idx} className="todo">
              
              <label>
                <input onChange={console.log} type="checkbox" checked={todo.doneAt} />
                 {todo.txt}
              </label>
            </li>
          })}
        </ul>
      </article>
    )
  }