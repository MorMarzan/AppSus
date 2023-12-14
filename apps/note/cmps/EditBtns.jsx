import { ColorPicker } from './ColorPicker.jsx'

export function EditBtns({
  onPalletteClick,
  isColorOpen,
  handleStyleChange,
  note,
}) {
  return (
    <div className="edit-btns">
      <div className="edit-btn-container">
        <div onClick={onPalletteClick} className="btn-display-container">
          <img src="../../../assets/img/color-palette.svg" />
        </div>
        {isColorOpen && (
          <ColorPicker
            pickedColor={note.style.backgroundColor}
            onChangeColor={handleStyleChange}
          />
        )}
      </div>
    </div>
  )
}
