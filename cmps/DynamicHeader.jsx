
const { Link, NavLink, useLocation } = ReactRouterDOM

export function DynamicHeader({ onSetIsSbFull }) {

  const { pathname } = useLocation()
  console.log('Current URL Path:', pathname)

  const headerType = (pathname.includes('mail')) ? 'mail' : 'note'


  return (
    <header className="dynamic-header">
      <button className="btn btn-menu" onClick={onSetIsSbFull}><i className="fa-solid fa-bars"></i></button>
      <h1>{headerType}</h1>
    </header>
  )
}
