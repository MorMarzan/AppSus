import { NoteImg } from "./NoteImg.jsx"
import { NoteTodos } from "./NoteTodos.jsx"
import { NoteTxt } from "./NoteTxt.jsx"
import { NoteVideo } from "./NoteVideo.jsx"

export function NotePreview({note}) {
  return (
    <article 
    style={note.style ? { backgroundColor: note.style.backgroundColor } : {}}
    className="note-preview"
    >
    <DynamicRating note={note} />
    </article>
  )
}


function DynamicRating(props) {
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