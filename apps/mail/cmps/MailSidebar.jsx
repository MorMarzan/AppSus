const { Link, NavLink } = ReactRouterDOM

export function MailSidebar() {
    return (
        <section className="mail-sidebar">
            <button>
                <i className="fa-solid fa-pencil"></i>
                <span>Compose</span>
            </button>
            <button>
                <i className="fa-solid fa-inbox"></i>
                <span>Inbox</span>
            </button>
            <button>
                <i className="fa-regular fa-star"></i>
                <span>Stared</span>
            </button>
            <button>
                <i className="fa-regular fa-paper-plane"></i>
                <span>Sent</span>
                </button>
            <button>
                <i className="fa-regular fa-pen-to-square"></i>
                <span>Draft</span>
            </button>
            <button>
                <i className="fa-solid fa-trash"></i>
                <span>Trash</span>
            </button>

            {/* <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/car" >Cars</NavLink>
                </nav> */}
        </section>
    )
}