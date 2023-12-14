import { ColorPicker } from './ColorPicker.jsx'

export function EditBtns({
  onPalletteClick,
  isColorOpen,
  handleStyleChange,
  note,
  onDeleteNote,
}) {
  return (
    <div className="edit-btns" onClick={(ev) => ev.stopPropagation()}>
      <div
        className="edit-btn-container"
        onClick={(ev) => ev.stopPropagation()}
      >
        <div onClick={onPalletteClick} className="btn-display-container">
          <img src="../../../assets/img/color-palette.svg" />
        </div>
        {isColorOpen && (
          <ColorPicker
            pickedColor={note.style.backgroundColor}
            onChangeColor={(color) => handleStyleChange(color, note)}
          />
        )}
      </div>
      {note.id && (
        <div
          className="edit-btn-container"
          onClick={(ev) => ev.stopPropagation()}
        >
          <div
            onClick={() => onDeleteNote(note.id)}
            className="btn-display-container"
          >
            <i className="fa-solid fa-trash" aria-hidden="true"></i>
          </div>
        </div>
      )}
    </div>
  )
}
