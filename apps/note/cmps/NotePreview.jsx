import { NoteImg } from "./NoteImg.jsx"
import { NoteTodos } from "./NoteTodos.jsx"
import { NoteTxt } from "./NoteTxt.jsx"
import { NoteVideo } from "./NoteVideo.jsx"

const { Link } = ReactRouterDOM

export function NotePreview({note}) {
  return (
    <Link to={`/note/edit/${note.id}`}>
    <article 
    onClick={ev => ev.stopPropagation()}
    style={note.style ? { backgroundColor: note.style.backgroundColor } : {}}
    className="note-preview"
    > 
        <DynamicCmp note={note} />
    </article>
    </Link>
  )
}


function DynamicCmp(props) {
    switch (props.note.type) {
        case 'NoteTxt':
            return <NoteTxt note={props.note} />
        case 'NoteImg':
            return <NoteImg note={props.note} />
        case 'NoteVideo':
            return <NoteVideo note={props.note} />
        case 'NoteTodos':
            return <NoteTodos note={props.note} />

    }
}