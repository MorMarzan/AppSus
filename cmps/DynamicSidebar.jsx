const { useState, useEffect } = React
import { MailSidebar } from '../apps/mail/cmps/MailSidebar.jsx'
import { NoteSidebar } from '../apps/note/cmps/NoteSidebar.jsx'

const { useLocation } = ReactRouterDOM

export function DynamicSidebar({ isSbOpen, onSetIsSbOpen }) {
  const { pathname } = useLocation()
  const sbType = pathname.includes('mail') ? 'mail' : 'note'

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const [isMobileSbOpen, setIsMobileSbOpen] = useState(null)
  const [isDesktopSbOpen, setIsDesktopSbOpen] = useState(null)

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (isMobile) {
      setIsMobileSbOpen(isSbOpen)
      setIsDesktopSbOpen(true)
    } else {
      setIsMobileSbOpen(true)
      setIsDesktopSbOpen(isSbOpen)
    }
  }, [isSbOpen, isMobile])

  function handleResize() {
    const currIsMobile = window.innerWidth <= 768
    setIsMobile(currIsMobile)
  }

  function onHoverSbToggle() {
    if (isMobile || isSbOpen) return
    setIsDesktopSbOpen((isDesktopSbOpen) => !isDesktopSbOpen)
  }

  return (
    <section
      className="dynamic-sidebar"
      onMouseEnter={onHoverSbToggle}
      onMouseLeave={onHoverSbToggle}
    >
      {isMobile && isMobileSbOpen && (
        <div className="main-screen" onClick={onSetIsSbOpen}></div>
      )}
      <DynamicCmp
        isSbOpen={isSbOpen}
        sbType={sbType}
        isMobileSbOpen={isMobileSbOpen}
        isDesktopSbOpen={isDesktopSbOpen}
      />
    </section>
  )
}

function DynamicCmp({ isSbOpen, sbType, isMobileSbOpen, isDesktopSbOpen }) {
  switch (sbType) {
    case 'mail':
      return (
        <MailSidebar
          isMobileSbOpen={isMobileSbOpen}
          isDesktopSbOpen={isDesktopSbOpen}
        />
      )

    case 'note':
      return (
        <NoteSidebar
          isMobileSbOpen={isMobileSbOpen}
          isDesktopSbOpen={isDesktopSbOpen}
        />
      )
  }
}
