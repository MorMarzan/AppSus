const { Link, NavLink, useLocation, useParams } = ReactRouterDOM
const { useState, useEffect, Fragment } = React

export function MailHeader() {

    const location = useLocation()
    const { mailId } = useParams()

    // const isMailInboxRoute = location.pathname === '/mail/inbox/';
    const hasMailId = !!mailId;
    // console.log('hasMailId', hasMailId)
    // console.log('isMailInboxRoute', isMailInboxRoute)

    return (
        <header className="mail-header full main-layout">
            <section>
                {hasMailId &&
                    <Fragment>
                        <Link className="btn"
                            to={'/mail/inbox'}>
                            <i className="fa-solid fa-arrow-left"></i>
                        </Link>
                        <button className="btn">
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </Fragment>
                }
                {/* <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/car" >Cars</NavLink>
                </nav> */}
            </section>
        </header>
    )
}