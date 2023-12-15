const { Link, NavLink, useLocation, useParams } = ReactRouterDOM

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
                    <Link className="btn"
                        to={'/mail/inbox'}>
                        <i className="fa-solid fa-arrow-left"></i>
                    </Link>
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