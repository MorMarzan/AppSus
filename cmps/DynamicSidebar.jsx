import { MailSidebar } from "../apps/mail/cmps/MailSidebar.jsx";
import { NoteSidebar } from "../apps/note/cmps/NoteSidebar.jsx";

const { useLocation } = ReactRouterDOM

export function DynamicSidebar({ isSbFull }) {

    const { pathname } = useLocation()
    const headerType = (pathname.includes('mail')) ? 'mail' : 'note'

    return (
        <section className="dynamic-sidebar">
            <DynamicCmp isSbFull={isSbFull} headerType={headerType} />
        </section>
    )
}

function DynamicCmp(props) {
    switch (props.headerType) {
        case 'mail':
            return <MailSidebar isSbFull={props.isSbFull} />

        case 'note':
            return <NoteSidebar isSbFull={props.isSbFull} />

    }
}



