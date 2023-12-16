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
            <button onClick={openNewCompose} className="btn">
                <i className="fa-solid fa-pencil"></i>
                {isDesktopSbOpen && <span>Compose</span>}
            </button>
    
            <nav className="app-nav">
                <NavLink className="btn" to="/mail/inbox">
                    <i className="fa-solid fa-inbox"></i>
                    {isDesktopSbOpen && <span>Inbox</span>}
                </NavLink>
                <NavLink className="btn" to="/mail/starred">
                    <i className="fa-regular fa-star"></i>
                    {isDesktopSbOpen && <span>Starred</span>}
                </NavLink>
                <NavLink className="btn" to="/mail/sent">
                    <i className="fa-regular fa-paper-plane"></i>
                    {isDesktopSbOpen && <span>Sent</span>}
                </NavLink>
                <NavLink className="btn" to="/mail/draft">
                    <i className="fa-regular fa-pen-to-square"></i>
                    {isDesktopSbOpen && <span>Draft</span>}
                </NavLink>
                <NavLink className="btn" to="/mail/draft">
                    <i className="fa-solid fa-trash"></i>
                    {isDesktopSbOpen && <span>Trash</span>}
                </NavLink>
            </nav>
        </section>
    )
}