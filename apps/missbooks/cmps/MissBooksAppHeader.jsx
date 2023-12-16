const { Link, NavLink } = ReactRouterDOM

export function MissBooksAppHeader() {
  return (
    <header className="app-header full main-layout">
      <section>
        <h1>Miss Books</h1>
        <nav className="app-nav">
          <NavLink to="/book/index">Books</NavLink>
          <NavLink to="/book/book-add">Google Books</NavLink>
        </nav>
      </section>
    </header>
  )
}
