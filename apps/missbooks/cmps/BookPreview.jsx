
export function BookPreview({book}) {
  return (
    <article className="book-preview">
        <h2>Title: {book.title}</h2>
        <h4>Price: 
        {new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: book.listPrice.currencyCode,
        }).format(book.listPrice.amount)}</h4>
        <img className="book-img" src={book.thumbnail}/>
    </article>
  )
}
