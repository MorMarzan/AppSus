export function ColorPicker({ onChangeColor, pickedColor }) {
  const colors = [
    'white',
    '#faafa8',
    '#f39f76',
    '#fff8b8',
    '#e2f6d3',
    '#b4ddd3',
    '#d4e4ed',
    '#aeccdc',
    '#d3bfdb',
    '#f6e2dd',
    '#e9e3d4',
    '#efeff1',
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
