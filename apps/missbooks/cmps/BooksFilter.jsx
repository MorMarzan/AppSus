const { useState, useEffect } = React

export function BooksFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    
    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])


    function onSetFilterBy(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break

            default:
                break;
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    const { txt, maxPrice, maxPageCount } = filterByToEdit
  return (
    <section className="books-filter main-layout full">
        <h2>Filter Our Books</h2>
        <form onSubmit={onSetFilterBy} >
            <div className="txt-input-container">
            <label htmlFor="txt">Title: </label>
            <input value={txt} onChange={handleChange} type="text" id="txt" name="txt" />

            <label htmlFor="maxPrice">maxPrice: </label>
            <input value={maxPrice || ''} onChange={handleChange} type="number" id="maxPrice" name="maxPrice" />
            </div>

            <label htmlFor="maxPageCount">maxPageCount: </label>
            <input title={maxPageCount} value={maxPageCount || ''} onChange={handleChange} type="range" id="maxPageCount" name="maxPageCount" min={0} max={1500} />

            {/* <button>Submit</button> */}
        </form>
    </section>
  )
}
