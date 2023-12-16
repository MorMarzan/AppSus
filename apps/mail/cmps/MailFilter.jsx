const { useState, useEffect } = React
const { useSearchParams } = ReactRouterDOM

import { mailService } from '../../mail/services/mail.service.js'
import { eventBusService } from '../../../services/event-bus.service.js'

export function MailFilter() {
  //register to onSetFilter

  const [searchParams, setSearchParams] = useSearchParams()
  const [filterByToEdit, setFilterByToEdit] = useState(
    mailService.getDefaultFilter()
  )
  // const [filterByToEdit, setFilterByToEdit] = useState(mailService.getFilterFromQueryString(searchParams))

  useEffect(() => {
    // onSetFilter(filterByToEdit)
    eventBusService.emit('on-set-filter', filterByToEdit)
    // setSearchParams(filterBy)
  }, [filterByToEdit])

  function onSetFilterBy(ev) {
    ev.preventDefault()
    // onSetFilter(filterByToEdit)
    eventBusService.emit('on-set-filter')
  }

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
      // case 'radio':
      //     value = target.checked
      //     break

      default:
        break
    }

    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  const { readStat } = filterByToEdit
  return (
    <section className="mail-filter">
      <h2>Filter Our Mails</h2>
      <form onSubmit={onSetFilterBy}>
        {/* <label htmlFor="txt">Vendor: </label>
                <input value={txt} onChange={handleChange} type="text" id="txt" name="txt" /> */}

        {/* <label htmlFor="readStat">Read Mails: </label>
                <input value={readStat} onChange={handleChange} type="checkbox" id="readStat" name="readStat" /> */}

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

        <button>Submit</button>
      </form>
    </section>
  )
}
