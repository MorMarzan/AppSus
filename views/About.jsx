import { CoderPreview } from '../cmps/CoderPreview.jsx'

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
          <CoderPreview
            fullName={'Mor Marzan'}
            name={'mor'}
            mail={'mormarzan@gmail.com'}
            github={'https://github.com/MorMarzan'}
          />
          <CoderPreview
            fullName={'Eden Rize'}
            name={'eden'}
            mail={'edenrize@gmail.com'}
            github={'https://github.com/EdenRize'}
          />
        </div>
      </div>
    </section>
  )
}
