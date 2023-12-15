export function ColorPicker({ onChangeColor, pickedColor }) {
  const colors = [
    'white',
    '#faafa8',
    '#f39f76',
    '#fff8b8',
    '#e2f6d3',
    '#d3bfdb',
  ]

  function onColorPickerClick(ev, color) {
    ev.stopPropagation()
    if (!color) return
    onChangeColor(color)
  }

  return (
    <div onClick={onColorPickerClick} className="color-picker">
      {colors.map((color) => {
        return (
          <div
            style={{
              backgroundColor: color,
              border: pickedColor === color ? '2px solid black' : '',
            }}
            key={color}
            onClick={(ev) => onColorPickerClick(ev, color)}
          ></div>
        )
      })}
    </div>
  )
}
