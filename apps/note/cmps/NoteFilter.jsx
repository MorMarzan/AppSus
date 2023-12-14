export default function NoteFilter({ onSetFilter, filter }) {
  const filters = [
    { display: 'Text Notes', filter: 'NoteTxt' },
    { display: 'Image Notes', filter: 'NoteImg' },
    { display: 'Todo Notes', filter: 'NoteTodos' },
    { display: 'Video Notes', filter: 'NoteVideo' },
  ]

  return (
    <section className="note-filter">
      {filters.map((filterItem) => {
        return (
          <p
            className={filter.type === filterItem.filter ? 'active' : ''}
            key={filterItem.display}
            onClick={() => onSetFilter({ type: filterItem.filter })}
          >
            {filterItem.display}
          </p>
        )
      })}
    </section>
  )
}
