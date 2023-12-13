export function NoteTodos({note}) {

    return (
      <article 
      className="note-todos"
      >
        {note.info.title && <h2>{note.info.title}</h2>}

        <ul className="note-todos-list">
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