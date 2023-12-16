const { Link } = ReactRouterDOM

import { BookList } from '../cmps/BookList.jsx'
import { BooksFilter } from '../cmps/BooksFilter.jsx'
import { booksService } from '../services/books-service.js'
import { showSuccessMsg } from '../../../services/event-bus.service.js'

const { useState, useEffect } = React

export function BookIndex() {
  const [books, setBooks] = useState(null)
  const [filterBy, setFilterBy] = useState(booksService.getDefaultFilter())

  useEffect(() => {
    loadBooks()
  }, [filterBy])

  function loadBooks() {
    booksService
      .query(filterBy)
      .then((books) => setBooks(books))
      .catch((err) => console.log('err:', err))
  }

  function onSetFilter(filterBy) {
    setFilterBy(filterBy)
  }

  function onRemoveBook(bookId) {
    booksService
      .remove(bookId)
      .then(() => {
        setBooks((prevBooks) => {
          return prevBooks.filter((book) => book.id !== bookId)
        })
        showSuccessMsg(`Book successfully removed! ${bookId}`)
      })
      .catch((err) => console.log('err:', err))
  }

  if (!books) return <div>Loading...</div>
  return (
    <section className="book-index main-layout full">
      <h1>Our Books</h1>
      <Link className="add-book-btn" to="/book/index/edit">
        Add a Book
      </Link>
      <BooksFilter filterBy={filterBy} onSetFilter={onSetFilter} />
      <BookList books={books} onRemoveBook={onRemoveBook} />
    </section>
  )
}
