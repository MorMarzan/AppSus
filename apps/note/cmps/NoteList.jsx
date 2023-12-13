import { NotePreview } from "./NotePreview.jsx"


export function NoteList({notes}) {

    if(!notes || !notes.length) return <h2 className="loading-msg">Loading...</h2>
    return (
        <section className="note-list">
            {notes.map(note => {
                return <NotePreview key={note.id} note={note} />
            })}
        </section>
    )
}
