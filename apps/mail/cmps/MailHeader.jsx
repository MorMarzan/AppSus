const { Link, NavLink } = ReactRouterDOM

export function MailHeader() {
    return (
        <header className="mail-header full main-layout">
            <section>
                <h1>Mail Header</h1>
                {/* <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/car" >Cars</NavLink>
                </nav> */}
            </section>
        </header>
    )
}