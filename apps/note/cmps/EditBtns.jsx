import { ColorPicker } from './ColorPicker.jsx'

export function EditBtns({
  onPalletteClick,
  isColorOpen,
  handleStyleChange,
  note,
}) {
  return (
    <div
      className="edit-btns"
      onClick={(ev) => ev.nativeEvent.stopImmediatePropagation()}
    >
      <div
        className="edit-btn-container"
        onClick={(ev) => ev.nativeEvent.stopImmediatePropagation()}
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
    </div>
  )
}
