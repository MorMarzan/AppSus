const { useState, useEffect, useRef } = React
import { utilService } from '../../../services/util.service.js'
import { booksService } from '../services/books-service.js'
import { googleService } from '../services/google-service.js'
import { BookAddList } from '../cmps/BookAddList.jsx'
import {
  showSuccessMsg,
  showErrorMsg,
} from '../../../services/event-bus.service.js'

export function BookAdd() {
  const [userSearch, setUserSearch] = useState('')
  const [books, setBooks] = useState(null)
  const debounceOnSearch = useRef(utilService.debounce(onGetBooks, 500))

  function onUserSearch(ev) {
    const search = ev.target.value
    setUserSearch(search)
    debounceOnSearch.current(search)
  }

  function onGetBooks(search) {
    if (!search) return
    googleService.getGoogleBooks(search).then(setBooks)
  }

  function onAddBook(book) {
    booksService
      .addGoogleBook(book)
      .then((book) => {
        showSuccessMsg(`Book successfully added! ${book.title}`)
      })
      .catch((err) => {
        showErrorMsg(err)
      })
  }

  return (
    <section className="book-add main-layout">
      <h1>book add</h1>
      <input
        value={userSearch}
        onChange={onUserSearch}
        type="text"
        placeholder="Search"
      />

      {books && <BookAddList books={books} onAddBook={onAddBook} />}
    </section>
  )
}
