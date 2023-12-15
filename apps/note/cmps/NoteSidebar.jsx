const { Link, NavLink } = ReactRouterDOM

export function NoteSidebar({ isSbOpen: isOpen }) {
  return (
    <section className="note-sidebar sidebar">
      {/* <button> */}
      <Link className="btn" to="/note/edit">
        <i className="fa-solid fa-pencil"></i>
        {isOpen && <span>Compose</span>}
      </Link>
      {/* </button> */}
      <button className="btn">
        <i className="fa-solid fa-inbox"></i>
        {isOpen && <span>Inbox</span>}
      </button>
      <button className="btn">
        <i className="fa-regular fa-star"></i>
        {isOpen && <span>Stared</span>}
      </button>
      <button className="btn">
        <i className="fa-regular fa-paper-plane"></i>
        {isOpen && <span>Sent</span>}
      </button>
      <button className="btn">
        <i className="fa-regular fa-pen-to-square"></i>
        {isOpen && <span>Draft</span>}
      </button>
      <button className="btn">
        <i className="fa-solid fa-trash"></i>
        {isOpen && <span>Trash</span>}
      </button>

      {/* <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/car" >Cars</NavLink>
                </nav> */}
    </section>
  )
}
