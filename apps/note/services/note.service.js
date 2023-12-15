// note service
import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

export const noteService = {
  query,
  get,
  save,
  remove,
  getEmptyNote,
  getEmptyFilterBy,
  getEmptyTodo,
  moveToBin,
}

const NOTES_KEY = 'notesDB'
const DELETED_NOTES_KEY = 'deletedNotesDB'
const dummyNotes = [
  {
    id: 'n101',
    createdAt: 1112222,
    type: 'NoteTxt',
    isPinned: true,
    style: {
      backgroundColor: '#faafa8',
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
      url: './assets/img/audi.jpg',
      title: 'Bobi and Me',
    },
    style: {
      backgroundColor: '#f39f76',
    },
  },
  {
    id: 'n103',
    type: 'NoteTodos',
    isPinned: false,
    info: {
      title: 'Get my stuff together',
      todos: [
        { txt: 'Driving license', doneAt: null, id: '1' },
        { txt: 'Coding power', doneAt: 187111111, id: '2' },
      ],
    },
    style: {
      backgroundColor: '#faafa8',
    },
  },
]

_initNotes()
_initDeletedNotes()

function query(filterBy, isDeleted = false) {
  const key = isDeleted ? DELETED_NOTES_KEY : NOTES_KEY
  return storageService.query(key).then((notes) => {
    if (filterBy.type && filterBy.type.length) {
      notes = notes.filter((note) => note.type === filterBy.type)
    }

    if (filterBy.txt && filterBy.txt.length) {
      const regex = new RegExp(filterBy.txt, 'i')
      notes = notes.filter((note) => {
        const titleMatch = note.info.title && regex.test(note.info.title)
        const txtMatch = note.info.txt && regex.test(note.info.txt)
        return titleMatch || txtMatch
      })
    }

    return notes
  })
}

function get(noteId) {
  return storageService.get(NOTES_KEY, noteId)
}

function save(note) {
  if (note.id) {
    return storageService.put(NOTES_KEY, note)
  } else {
    return storageService.post(NOTES_KEY, note)
  }
}

function remove(noteId) {
  return storageService.remove(NOTES_KEY, noteId)
}

function moveToBin(note) {
  return remove(note.id).then(storageService.post(DELETED_NOTES_KEY, note))
}

function getEmptyNote(type, title = '') {
  const note = {
    id: '',
    info: { title },
    isPinned: false,
    style: { backgroundColor: 'white' },
    type,
  }

  switch (type) {
    case 'NoteTxt':
      note.info.txt = ''
      break

    case 'NoteImg':
    case 'NoteVideo':
      note.info.url = ''
      break

    case 'NoteTodos':
      note.info.todos = []
      break

    default:
      break
  }

  return note
}

function getEmptyFilterBy() {
  return { txt: '', type: '' }
}

function getEmptyTodo() {
  return { txt: '', doneAt: null, id: utilService.makeId() }
}

// PRIVET
function _initNotes() {
  const notes = JSON.parse(localStorage.getItem(NOTES_KEY))
  if (notes && notes.length) return
  localStorage.setItem(NOTES_KEY, JSON.stringify(dummyNotes))
}

function _initDeletedNotes() {
  const notes = JSON.parse(localStorage.getItem(DELETED_NOTES_KEY))
  if (notes && notes.length) return
  localStorage.setItem(DELETED_NOTES_KEY, JSON.stringify([]))
}
