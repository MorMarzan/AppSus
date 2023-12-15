import { ColorPicker } from './ColorPicker.jsx'
const { useState, useEffect, Fragment } = React

export function EditBtns({
  onPalletteClick,
  isColorOpen,
  handleStyleChange,
  note,
  onDeleteNote,
  onDuplicateNote,
}) {
  return (
    <div className="edit-btns" onClick={(ev) => ev.stopPropagation()}>
      <div
        title="Choose Color"
        className="edit-btn-container"
        onClick={(ev) => ev.stopPropagation()}
      >
        <div onClick={onPalletteClick} className="btn-display-container">
          <img src="./assets/img/color-palette.svg" />
        </div>
        {isColorOpen && (
          <ColorPicker
            pickedColor={note.style.backgroundColor}
            onChangeColor={(color) => handleStyleChange(color, note)}
          />
        )}
      </div>
      {note.id && (
        <Fragment>
          <div
            title="Duplicate"
            className="edit-btn-container"
            onClick={(ev) => ev.stopPropagation()}
          >
            <div
              onClick={() => onDuplicateNote(note)}
              className="btn-display-container"
            >
              <img src="./assets/img/copy.svg" />
            </div>
          </div>

          <div
            title="Delete"
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
        </Fragment>
      )}
    </div>
  )
}
