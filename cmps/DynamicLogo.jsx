export function DynamicLogo({ page }) {
  return (
    <div className="dynamic-logo">
      <img src={`./assets/img/${page}.svg`} />
      <h2>{page === 'mail' ? 'Gmail' : 'Notes'}</h2>
    </div>
  )
}
