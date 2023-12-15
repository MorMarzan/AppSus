const { Route, Routes, Navigate } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./views/About.jsx"
import { Home } from "./views/Home.jsx"
import { MailIndex } from "./apps/mail/views/MailIndex.jsx"
import { NoteIndex } from "./apps/note/views/NoteIndex.jsx"
import { MailEdit } from "./apps/mail/views/MailEdit.jsx"
import { EditNote } from "./apps/note/cmps/EditNote.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"
import { MailDetails } from "./apps/mail/views/MailDetails.jsx"
import { MailApp } from "./apps/mail/views/MailApp.jsx"



export function App() {
    return <Router>
        <section className="app">
            <AppHeader />

            <Routes>
                {/* shared */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />

                {/* mail */}
                <Route path="/mail" element={<MailApp />} >
                    <Route index element={<Navigate to="/mail/inbox" />} />
                    <Route path="/mail/inbox" element={<MailIndex />} />
                    {/* <Route path="/mail/:compose" element={<MailEdit />} /> */}
                    <Route path="/mail/inbox/:mailId" element={<MailDetails />} />
                </Route>

                {/* note */}
                <Route path="/note" element={<NoteIndex />} >
                    <Route path="/note/edit/:noteId" element={<EditNote />} />
                </Route>

            </Routes>

            <UserMsg />
        </section>
    </Router>
}
