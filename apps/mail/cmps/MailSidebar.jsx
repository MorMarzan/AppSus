import { DynamicLogo } from '../../../cmps/DynamicLogo.jsx'

const { Link, NavLink, useNavigate } = ReactRouterDOM
const { useState, useEffect } = React

export function MailSidebar({ isMobileSbOpen, isDesktopSbOpen, isMobile }) {
  const navigate = useNavigate()

  function openNewCompose() {
    navigate({
      search: `?compose=new`,
    })
  }

  const dynClass = isMobileSbOpen ? 'open' : ''

  return (
    <section className={dynClass + ' sidebar mail-sidebar'}>
      {isMobile && <DynamicLogo page={'mail'} />}

      <div className="sidebar-btns">
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
          <NavLink className="btn" to="/mail/bin">
            <i className="fa-solid fa-trash"></i>
            {isDesktopSbOpen && <span>Bin</span>}
          </NavLink>
        </nav>
      </div>
    </section>
  )
}
