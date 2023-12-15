const { Link, NavLink, useNavigate } = ReactRouterDOM
const { useState, useEffect } = React

export function MailSidebar({ isMobileSbOpen, isDesktopSbOpen }) {

    const navigate = useNavigate()

    function openNewCompose() {
        navigate({
            search: `?compose=true`,
          })
    }

    const dynClass = isMobileSbOpen ? 'open' : ''

    return (
        // <section className="mail-sidebar">
        <section className={dynClass + " sidebar"}>
            <div onClick={openNewCompose} className="btn">
                <i className="fa-solid fa-pencil"></i>
                {isDesktopSbOpen && <span>Compose</span>}
            </div>
            {/* <Link className="btn" to="/mail/edit">
                <i className="fa-solid fa-pencil"></i>
                {isDesktopSbOpen && <span>Compose</span>}
            </Link> */}
            <button className="btn">
                <i className="fa-solid fa-inbox"></i>
                {isDesktopSbOpen && <span>Inbox</span>}
            </button>
            <button className="btn">
                <i className="fa-regular fa-star"></i>
                {isDesktopSbOpen && <span>Stared</span>}
            </button>
            <button className="btn">
                <i className="fa-regular fa-paper-plane"></i>
                {isDesktopSbOpen && <span>Sent</span>}
            </button>
            <button className="btn">
                <i className="fa-regular fa-pen-to-square"></i>
                {isDesktopSbOpen && <span>Draft</span>}
            </button>
            <button className="btn">
                <i className="fa-solid fa-trash"></i>
                {isDesktopSbOpen && <span>Trash</span>}
            </button>

            {/* <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/car" >Cars</NavLink>
                </nav> */}
        </section>
    )
}