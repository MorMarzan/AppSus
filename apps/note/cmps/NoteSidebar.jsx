const { Link, NavLink } = ReactRouterDOM

export function NoteSidebar({ isSbFull: isFull }) {
  return (
    <section className="note-sidebar sidebar">
      {/* <button> */}
      <Link className="btn" to="/note/edit">
        <i className="fa-solid fa-pencil"></i>
        {isFull && <span>Compose</span>}
      </Link>
      {/* </button> */}
      <button className="btn">
        <i className="fa-solid fa-inbox"></i>
        {isFull && <span>Inbox</span>}
      </button>
      <button className="btn">
        <i className="fa-regular fa-star"></i>
        {isFull && <span>Stared</span>}
      </button>
      <button className="btn">
        <i className="fa-regular fa-paper-plane"></i>
        {isFull && <span>Sent</span>}
      </button>
      <button className="btn">
        <i className="fa-regular fa-pen-to-square"></i>
        {isFull && <span>Draft</span>}
      </button>
      <button className="btn">
        <i className="fa-solid fa-trash"></i>
        {isFull && <span>Trash</span>}
      </button>

      {/* <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/car" >Cars</NavLink>
                </nav> */}
    </section>
  )
}
