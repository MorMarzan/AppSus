const { useParams, useNavigate, Link } = ReactRouterDOM

import { AddReview } from '../cmps/AddReview.jsx'
import { LongTxt } from '../cmps/LongText.jsx'
import { ReviewList } from '../cmps/ReviewList.jsx'
import { booksService } from '../services/books-service.js'
import { showSuccessMsg } from '../../../services/event-bus.service.js'

const { useState, useEffect } = React

export function BookDetails() {
  const [book, setBook] = useState(null)
  const [prevBookId, setPrevBookId] = useState(null)
  const [nextBookId, setNextBookId] = useState(null)
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    loadBook()
  }, [params.bookId])

  function loadBook() {
    booksService
      .get(params.bookId)
      .then(setBook)
      .catch((err) => {
        console.log('err:', err)
        navigate('/')
      })
  }

  function onBack() {
    navigate('/book')
  }

  function getYearDesc(publishedDate) {
    return new Date().getFullYear() - publishedDate > 10 ? (
      <span>Vintage</span>
    ) : (
      <span>New</span>
    )
  }

  function getPageCountDesc(pageCount) {
    if (pageCount > 500) return '(Serious Reading)'
    else if (pageCount > 200) return '(Descent Reading)'
    else if (pageCount < 100) return '(Light Reading)'
  }

  function getPriceClass(price) {
    return price > 150 ? 'red' : price < 20 ? 'green' : ''
  }

  function onAddReview(review) {
    booksService
      .addReview(book.id, review)
      .then((book) => {
        setBook(book)
        showSuccessMsg(`Review successfully added! ${book.reviews[0].id}`)
      })
      .catch((err) => console.log('err:', err))
  }

  function onDeleteReview(reviewId) {
    booksService
      .deleteReview(book.id, reviewId)
      .then((book) => {
        setBook(book)
        showSuccessMsg(`Review successfully removed!`)
      })
      .catch((err) => console.log('err:', err))
  }

  if (book) {
    booksService.getNextBookId(book.id).then(setNextBookId)

    booksService.getPrevBookId(book.id).then(setPrevBookId)
  }

  if (!book) return <section>Loading...</section>
  return (
    <section className="book-details main-layout full">
      <h1>Title: {book.title}</h1>
      <h3>
        Authors:
        {book.authors.map((author, idx) => {
          return <span key={idx}>{author}</span>
        })}
      </h3>
      <p>
        Published At: {book.publishedDate} ({getYearDesc(book.publishedDate)})
      </p>
      <p>
        Price:{' '}
        <span className={getPriceClass(book.listPrice.amount)}>
          {' '}
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: book.listPrice.currencyCode,
          }).format(book.listPrice.amount)}
        </span>
      </p>
      {book.listPrice.isOnSale && <p>On Sale!</p>}
      <p>
        Page Count: {book.pageCount} {getPageCountDesc(book.pageCount)}
      </p>
      {book.description && <LongTxt txt={book.description} />}

      <img className="book-img" src={book.thumbnail} />
      <ReviewList reviews={book.reviews} onDelete={onDeleteReview} />
      <AddReview addReview={onAddReview} />

      <nav className="book-nav">
        {prevBookId && (
          <Link to={`/book/index/${prevBookId}`}>← Prev Book</Link>
        )}
        {nextBookId && (
          <Link to={`/book/index/${nextBookId}`}>Next Book →</Link>
        )}
      </nav>

      <img onClick={onBack} className="back-img" src="./assets/img/back.svg" />
    </section>
  )
}
