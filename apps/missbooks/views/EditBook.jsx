const { useNavigate, useParams, Link } = ReactRouterDOM
import { booksService } from '../services/books-service.js'
import { showSuccessMsg } from '../../../services/event-bus.service.js'

const { useState, useEffect } = React

export function EditBook() {
  const [bookToEdit, setBookToEdit] = useState(
    booksService.getEmptyBook('New Book', 70, 2023, 100, 'en', false)
  )
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    if (params.bookId) loadBook()
  }, [])

  function loadBook() {
    booksService
      .get(params.bookId)
      .then(setBookToEdit)
      .catch((err) => console.log('err:', err))
  }

  function onSaveBook(ev) {
    ev.preventDefault()
    booksService
      .save(bookToEdit)
      .then((book) => {
        onBack()
        showSuccessMsg(`Book successfully saved! ${book.id}`)
      })
      .catch((err) => console.log('err:', err))
  }

  function onBack() {
    navigate('/book')
  }

  function handleInputChange({ target }) {
    var field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value
        break

      case 'checkbox':
        value = target.checked
        break
    }

    if (field === 'price' || field === 'isOnSale') {
      handlePriceChange(field, value)
      return
    }

    setBookToEdit((prevBookProps) => {
      return { ...prevBookProps, [field]: value }
    })
  }

  function handlePriceChange(field, value) {
    if (field === 'price') field = 'amount'
    setBookToEdit((prevBookProps) => {
      const newListPrice = { ...prevBookProps.listPrice, [field]: value }
      return { ...prevBookProps, listPrice: newListPrice }
    })
  }

  const { title, pageCount, publishedDate, language } = bookToEdit
  const price = bookToEdit.listPrice.amount
  const isOnSale = bookToEdit.listPrice.isOnSale

  const inputs = [
    {
      htmlFor: 'title',
      label: 'Title:',
      type: 'text',
      name: 'title',
      id: 'title',
      value: title,
    },
    {
      htmlFor: 'price',
      label: 'Price:',
      type: 'number',
      name: 'price',
      id: 'price',
      value: price,
    },
    {
      htmlFor: 'pageCount',
      label: 'Page Count:',
      max: 1000,
      type: 'number',
      name: 'pageCount',
      id: 'pageCount',
      value: pageCount,
    },
    {
      htmlFor: 'publishedDate',
      label: 'Published Date:',
      type: 'number',
      name: 'publishedDate',
      id: 'publishedDate',
      value: publishedDate,
    },
    {
      htmlFor: 'language',
      label: 'Language:',
      type: 'text',
      name: 'language',
      id: 'language',
      value: language,
    },
  ]

  return (
    <section className="edit-book main-layout full">
      <div className="edit-book-container">
        <h2>Add a Book</h2>
        <form onSubmit={onSaveBook}>
          {inputs.map((input) => {
            return (
              <React.Fragment key={input.id}>
                <label htmlFor={input.htmlFor}>{input.label}</label>
                <input
                  required
                  max={input.max}
                  type={input.type}
                  value={input.value || ''}
                  name={input.name}
                  id={input.id}
                  onChange={handleInputChange}
                />
              </React.Fragment>
            )
          })}

          <label htmlFor="isOnSale">
            Is On Sale:{' '}
            <input
              checked={isOnSale}
              onChange={handleInputChange}
              type="checkbox"
              id="isOnSale"
              name="isOnSale"
            />{' '}
          </label>

          <button>Save Book</button>
        </form>
      </div>
      <Link className="go-back" to="/book">
        <img src="../assets/img/back.svg" />
      </Link>
    </section>
  )
}
