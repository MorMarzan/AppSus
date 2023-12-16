
const { useState, useEffect } = React


// export function MailFilterNotDynamic() {
export function MailFilterNotDynamic({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const [sortByToEdit, setSortByToEdit] = useState({ sentAt: 1, subject: 1 })

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    // useEffect(() => {
    //     onSetSortBy(sortByToEdit)
    // }, [sortByToEdit])

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

    function handleSort({ target }) {
        const field = target.name
        let value = target.checked
        setSortByToEdit(prevSort => ({ ...prevSort, [field]: value }))
    }


    const { txt, readStat } = filterByToEdit
    return (
        <section className="mail-filter">
            <h2>Filter Our Mails</h2>
            <form onSubmit={onSetFilterBy} >
                <label htmlFor="txt">Text: </label>
                <input value={txt} onChange={handleChange} type="text" id="txt" name="txt" />


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

                {/* <label htmlFor="subject">Subject sort: </label>
                <input onChange={handleSort} type="checkbox" id="subject" name="subject" /> */}

                {/* <button>Submit</button> */}
            </form>
        </section>
    )
}