const { Link, NavLink, useLocation } = ReactRouterDOM

export function DynamicHeader({ onSetIsSbFull, searchValue, onSearch }) {
  const { pathname } = useLocation()

  const headerType = pathname.includes('mail') ? 'mail' : 'note'

  return (
    <header className="dynamic-header">
      <div className="logo-menu-wrapper">
        <button className="btn btn-menu" onClick={onSetIsSbFull}>
          <i className="fa-solid fa-bars"></i>
        </button>
        <h1>{headerType}</h1>
      </div>
      <form className="search-form" onSubmit={(ev) => ev.preventDefault()}>
        <button>
          <img className="search-img" src="./assets/img/search.svg" />
        </button>
        <input
          value={searchValue}
          onChange={onSearch}
          className="search-input"
          type="text"
          placeholder="Search"
        />
      </form>
    </header>
  )
}
