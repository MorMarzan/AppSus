const { Outlet, Link } = ReactRouterDOM

export function AboutUs() {
  return (
    <section className="about-us main-layout">
        <h1>About Us</h1>
        <p>Hello there! Thank you for using our books website! we hope you enjoy it ❤</p>

        <nav>
          <Link to="/about/team">Team</Link>
          <Link to="/about/goal">Goals</Link>
        </nav>
      <Outlet />
    </section>
  )
}
