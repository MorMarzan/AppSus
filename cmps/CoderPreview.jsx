export function CoderPreview({ fullName, name, mail, github }) {
  return (
    <div className="coder-container">
      <div className="img-container">
        <img src={`./assets/img/${name}.png`} />
      </div>
      <h4>{fullName}</h4>
      <div className="social-links">
        <a
          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${mail}`}
          target="_blank"
        >
          <img src="./assets/img/mail.svg" />
        </a>

        <a href={github} target="_blank">
          <img src="./assets/img/github.svg" />
        </a>
      </div>
    </div>
  )
}
