const { Link } = ReactRouterDOM
import { BookPreview } from './BookPreview.jsx'

export function BookList({ books, onRemoveBook }) {
  if (!books.length) return <h2 className="no-info-msg">No books to display</h2>
  return (
    <ul className="book-list">
      {books.map((book) => {
        return (
          <li key={book.id}>
            <BookPreview book={book} />
            <section>
              <button>
                <Link to={`/book/index/${book.id}`}>Details</Link>
              </button>
              <button>
                <Link to={`/book/index/edit/${book.id}`}>Edit</Link>
              </button>
              <button onClick={() => onRemoveBook(book.id)}>Remove Book</button>
            </section>
          </li>
        )
      })}
    </ul>
  )
}
