const { Link, NavLink } = ReactRouterDOM

export function NoteSidebar({ isMobileSbOpen, isDesktopSbOpen }) {
  const dynClass = isMobileSbOpen ? 'open' : ''
  return (
    <section className={dynClass + ' sidebar note-sidebar'}>
      <NavLink to="/note/notes">
        <button className="btn">
          <img src="./assets/img/bulb.svg" />
          {isDesktopSbOpen && <span>Notes</span>}
        </button>
      </NavLink>
      <NavLink to="/note/bin">
        <button className="btn">
          <i className="fa-solid fa-trash"></i>
          {isDesktopSbOpen && <span>Bin</span>}
        </button>
      </NavLink>
    </section>
  )
}
