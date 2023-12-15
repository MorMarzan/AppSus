export function TrashBtns({ noteId, onDeleteForever }) {
  return (
    <div
      className="trash-btns edit-btns"
      onClick={(ev) => ev.stopPropagation()}
    >
      <div
        title="Delete Forever"
        className="edit-btn-container"
        onClick={(ev) => ev.stopPropagation()}
      >
        <div
          onClick={() => onDeleteForever(noteId)}
          className="btn-display-container"
        >
          <img src="./assets/img/delete-forever.svg" />
        </div>
      </div>

      <div
        title="Restore"
        className="edit-btn-container"
        onClick={(ev) => ev.stopPropagation()}
      >
        <div className="btn-display-container">
          <img src="./assets/img/restore.svg" />
        </div>
      </div>
    </div>
  )
}
