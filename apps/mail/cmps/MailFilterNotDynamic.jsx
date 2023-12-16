const { useState, useEffect } = React

export function MailFilterNotDynamic({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  useEffect(() => {
    onSetFilter(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value
        break

      case 'checkbox':
        value = target.checked
        break

      default:
        break
    }

    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  // function handleSort({ target }) {
  //   const field = target.name
  //   let value = target.checked
  //   setSortByToEdit((prevSort) => ({ ...prevSort, [field]: value }))
  // }

  function onFormSubmit(ev) {
    ev.preventDefault()
  }

  const { txt, readStat } = filterByToEdit
  return (
    <section className="mail-filter dynamic-header">
      <form onSubmit={onFormSubmit} className="search-form">
        <button>
          <img className="search-img" src="./assets/img/search.svg" />
        </button>
        <input
          className="search-input"
          placeholder="Search"
          value={txt}
          onChange={handleChange}
          type="text"
          name="txt"
        />
      </form>

      <i
        className="fa-solid fa-filter"
        onClick={() => setIsFilterOpen((filterOpen) => !filterOpen)}
      ></i>

      {isFilterOpen && (
        <form onSubmit={onFormSubmit} className="mail-read-filter dynamic-filter">
          <label>
            <input
              type="radio"
              value="all"
              name="readStat"
              checked={readStat === 'all'}
              onChange={handleChange}
            />
            All
          </label>

          <label>
            <input
              type="radio"
              value="read"
              name="readStat"
              checked={readStat === 'read'}
              onChange={handleChange}
            />
            Read
          </label>

          <label>
            <input
              type="radio"
              value="unread"
              name="readStat"
              checked={readStat === 'unread'}
              onChange={handleChange}
            />
            Unread
          </label>
        </form>
      )}
    </section>
  )
}
