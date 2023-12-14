import NoteFilter from '../apps/note/cmps/NoteFilter.jsx'

const { useLocation } = ReactRouterDOM

export function DynamicFilter({ onSetFilter, filter }) {
  const { pathname } = useLocation()
  const headerType = pathname.includes('mail') ? 'mail' : 'note'

  return (
    <section className="dynamic-filter">
      <DynamicCmp
        onSetFilter={onSetFilter}
        filter={filter}
        headerType={headerType}
      />
    </section>
  )
}

function DynamicCmp(props) {
  switch (props.headerType) {
    case 'note':
      return (
        <NoteFilter onSetFilter={props.onSetFilter} filter={props.filter} />
      )
  }
}
