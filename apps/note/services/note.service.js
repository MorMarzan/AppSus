// note service
import { storageService } from '../../../services/async-storage.service.js'

export const noteService = {
  query,
}

const NOTES_KEY = 'notesDB'

_initNotes()

function query() {
  return storageService.query(NOTES_KEY)
}

function _initNotes() {
  storageService.query(NOTES_KEY).then((notes) => {
    if (notes && notes.length) return

    localStorage.setItem(NOTES_KEY, JSON.stringify(dummyNotes))
  })
}

const dummyNotes = [
  {
    id: 'n101',
    createdAt: 1112222,
    type: 'NoteTxt',
    isPinned: true,
    style: {
      backgroundColor: '#00d',
    },
    info: {
      txt: 'Fullstack Me Baby!',
    },
  },
  {
    id: 'n102',
    type: 'NoteImg',
    isPinned: false,
    info: {
      url: 'http://some-img/me',
      title: 'Bobi and Me',
    },
    style: {
      backgroundColor: '#00d',
    },
  },
  {
    id: 'n103',
    type: 'NoteTodos',
    isPinned: false,
    info: {
      title: 'Get my stuff together',
      todos: [
        { txt: 'Driving license', doneAt: null },
        { txt: 'Coding power', doneAt: 187111111 },
      ],
    },
  },
]
