import { storageService } from '../../../services/async-storage.service.js'

const STORAGE_KEY_SEARCHES = 'bookSearchesDB'

export const googleService = {
  getGoogleBooks,
}

function getGoogleBooks(searchValue) {
  return get(STORAGE_KEY_SEARCHES, searchValue).then((searchesFromLocal) => {
    if (searchesFromLocal) {
      console.log('searchesFromLocal', searchesFromLocal)
      console.log('FROM CACHE')
      return Promise.resolve(searchesFromLocal.books.items)
    }

    console.log('FROM AXIOS')
    return axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?printType=books&q=${searchValue}`
      )
      .then((res) => res.data)
      .then((books) => {
        storageService.post(STORAGE_KEY_SEARCHES, { searchValue, books })
        console.log('books', books)
        return books.items
      })
  })
}

function get(entityType, entityTitle) {
  return storageService.query(entityType).then((entities) => {
    const entity = entities.find((entity) => entity.searchValue === entityTitle)
    return entity
  })
}
