export function NoteTypeBar({ noteType, onChangeType }) {
  const types = ['NoteTxt', 'NoteImg']

  return (
    <div className="note-type-bar">
      {types.map((type) => {
        return (
          <img
            key={type}
            onClick={() => onChangeType(type)}
            src={`./assets/img/${
              noteType === type ? 'active' : 'unactive'
            }-${type}.svg`}
          />
        )
      })}
    </div>
  )
}
