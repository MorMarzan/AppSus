const { useState, useEffect } = React

export function DynamicLogo({ page }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500)

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  function handleResize() {
    const currIsMobile = window.innerWidth <= 500
    setIsMobile(currIsMobile)
  }

  return (
    <div className="dynamic-logo">
      <img src={`./assets/img/${page}.svg`} />
      <h2>{page === 'mail' ? 'Gmail' : 'Notes'}</h2>
    </div>
  )
}
