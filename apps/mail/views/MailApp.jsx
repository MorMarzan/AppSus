const { Outlet, useSearchParams } = ReactRouterDOM

import { MailHeader } from "../cmps/MailHeader.jsx"
import { MailFooter } from "../cmps/MailFooter.jsx"
import { DynamicHeader } from "../../../cmps/DynamicHeader.jsx"
import { DynamicSidebar } from "../../../cmps/DynamicSidebar.jsx"
import { MailEdit } from "./MailEdit.jsx"

const { useState } = React

export function MailApp() {

    const [searchParams] = useSearchParams()
    const hasComposeParam = searchParams.has('compose')

    const [isSbOpen, setIsSbOpen] = useState(false)

    function onSetIsSbOpen() {
        setIsSbOpen(isSbOpen => !isSbOpen)
    }
    
    return (
        <section className="mail-app page">
            <DynamicHeader onSetIsSbOpen={onSetIsSbOpen} />
            <DynamicSidebar isSbOpen={isSbOpen} onSetIsSbOpen={onSetIsSbOpen} />
            <div>
                <MailHeader />
                <Outlet /> 
                <MailFooter />
            </div>
            {hasComposeParam && <MailEdit />}
        </section>
    )
}

