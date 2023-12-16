const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {
  return (
    <header className="app-header">
      <Link to="/">
        <div className="logo-container">
          <img className="app-logo" src="./assets/img/appsus-logo.png" />
          <h3>AppSus</h3>
        </div>
      </Link>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/mail">Mail</NavLink>
        <NavLink to="/note">Note</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
    </header>
  )
}
