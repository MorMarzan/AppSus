const { Link, NavLink } = ReactRouterDOM
const { useState, useEffect } = React

export function MailSidebar() {

    const [isFull, setIsfull] = useState(false)

    return (
        <section className="mail-sidebar">
            <button>
                <i className="fa-solid fa-pencil"></i>
                {isFull && <span>Compose</span>}
            </button>
            <button>
                <i className="fa-solid fa-inbox"></i>
                {isFull && <span>Inbox</span>}
            </button>
            <button>
                <i className="fa-regular fa-star"></i>
                {isFull && <span>Stared</span>}
            </button>
            <button>
                <i className="fa-regular fa-paper-plane"></i>
                {isFull && <span>Sent</span>}
                </button>
            <button>
                <i className="fa-regular fa-pen-to-square"></i>
                {isFull && <span>Draft</span>}
            </button>
            <button>
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