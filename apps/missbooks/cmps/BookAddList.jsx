
export function BookAddList({books, onAddBook}) {
    console.log('books',books)
  return (
    <ul className="book-add-list">
        {books.map(book => {
            return <li key={book.id}>
                <p>{book.volumeInfo.title}</p>
                <img onClick={() => onAddBook(book)} src="./assets/img/add.svg"/>
            </li>
        })}
    </ul>
  )
}
