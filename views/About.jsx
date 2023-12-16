export function About() {
  return (
    <section className="about page">
      <h1>About Us</h1>

      <div className="about-content">
        <h3>Welcome to AppSus!</h3>
        <p>
          This website was developed by us, <span>Mor Marzan & Eden Rize</span>.
          We are students in "Coding Academy", on our way to be Full-stack
          developers. This website was built with React JS <span>❤</span>
        </p>

        <div className="imgs-container">
          <div className="coder-container">
            <div className="img-container">
              <img src="./assets/img/mor.png" />
            </div>
            <h4>Mor Marzan</h4>
          </div>

          <div className="coder-container">
            <div className="img-container">
              <img src="./assets/img/eden.png" />
            </div>
            <h4>Eden Rize</h4>
          </div>
        </div>
      </div>
    </section>
  )
}
