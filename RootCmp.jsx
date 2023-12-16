const { Route, Routes, Navigate } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from './cmps/AppHeader.jsx'
import { About } from './views/About.jsx'
import { Home } from './views/Home.jsx'
import { MailIndex } from './apps/mail/views/MailIndex.jsx'
import { MailEdit } from './apps/mail/views/MailEdit.jsx'
import { NoteIndex } from './apps/note/views/NoteIndex.jsx'
import { EditNote } from './apps/note/cmps/EditNote.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { MailDetails } from './apps/mail/views/MailDetails.jsx'
import { MailApp } from './apps/mail/views/MailApp.jsx'
import { NoteApp } from './apps/note/views/NoteApp.jsx'
import { NoteBin } from './apps/note/views/NoteBin.jsx'
import { Loader } from './cmps/Loader.jsx'

const { useState, useEffect } = React
import { MissBooksApp } from './apps/missbooks/views/MissBooksApp.jsx'
import { BookIndex } from './apps/missbooks/views/BookIndex.jsx'
import { BookDetails } from './apps/missbooks/views/BookDetails.jsx'
import { EditBook } from './apps/missbooks/views/EditBook.jsx'
import { BookAdd } from './apps/missbooks/views/BookAdd.jsx'

export function App() {
  return (
    <Router>
      <section className="app">
        <AppHeader />

        <Routes>
          {/* shared */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          {/* mail */}
          <Route path="/mail" element={<MailApp />}>
            <Route index element={<Navigate to="/mail/inbox" />} />
            <Route path="/mail/inbox" element={<MailIndex />} />
            <Route path="/mail/inbox/:mailId" element={<MailDetails />} />
            <Route path="/mail/starred" element={<MailIndex />} />
            <Route path="/mail/sent" element={<MailIndex />} />
            <Route path="/mail/draft" element={<MailIndex />} />
            <Route path="/mail/bin" element={<MailIndex />} />
          </Route>

          {/* note */}
          <Route path="/note" element={<NoteApp />}>
            <Route index element={<Navigate to="/note/notes" />} />
            <Route path="/note/notes/" element={<NoteIndex />} />
            <Route path="/note/edit/:noteId" element={<EditNote />} />
            <Route path="/note/bin" element={<NoteBin />} />
          </Route>

          {/* miss books */}
          <Route path="/book" element={<MissBooksApp />}>
            <Route index element={<Navigate to="/book/index" />} />
            <Route path="/book/index" element={<BookIndex />} />
            <Route path="/book/index/:bookId" element={<BookDetails />} />
            <Route path="/book/index/edit/:bookId" element={<EditBook />} />
            <Route path="/book/index/edit" element={<EditBook />} />
            <Route path="/book/book-add" element={<BookAdd />} />
          </Route>
        </Routes>

        <UserMsg />
      </section>
    </Router>
  )
}
