// note service
import { storageService } from '../../../services/async-storage.service.js'

export const noteService = {
  query,
  get,
  save,
  remove,
  getEmptyNote,
}

const NOTES_KEY = 'notesDB'
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
      url: './assets/img/audi.jpg',
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

_initNotes()

function query() {
  return storageService.query(NOTES_KEY)
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

function getEmptyNote() {
  return {
    id: '',
    info: { title: '', txt: '' },
    isPinned: false,
    style: { backgroundColor: 'white' },
    type: 'NoteTxt',
  }
}

// PRIVET
function _initNotes() {
  const notes = JSON.parse(localStorage.getItem(NOTES_KEY))
  if (notes && notes.length) return
  localStorage.setItem(NOTES_KEY, JSON.stringify(dummyNotes))
}
