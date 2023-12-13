import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'
_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    // getDefaultFilter,
    // getFilterFromQueryString
}

const gDemoMails = [
    {
      id: 'e101',
      subject: 'Miss you!',
      body: 'Would love to catch up sometimes',
      isRead: false,
      sentAt: 1551133930594,
      removedAt: null,
      from: 'momo@momo.com',
      to: 'user1@appsus.com'
    },
    {
      id: 'e102',
      subject: 'Re: Miss you!',
      body: 'Sure, let\'s plan something!',
      isRead: false,
      sentAt: 1551133931594,
      removedAt: null,
      from: 'momo@momo.com',
      to: 'user2@appsus.com'
    },
    {
      id: 'e103',
      subject: 'Weekend Plans?',
      body: 'How about a movie on Saturday?',
      isRead: true,
      sentAt: 1551133932594,
      removedAt: null,
      from: 'momo@momo.com',
      to: 'user3@appsus.com'
    },
    {
      id: 'e104',
      subject: 'Meeting Tomorrow',
      body: 'Don\'t forget about our meeting at 10 AM',
      isRead: false,
      sentAt: 1551133933594,
      removedAt: null,
      from: 'momo@momo.com',
      to: 'user4@appsus.com'
    },
    {
      id: 'e105',
      subject: 'Quick Question',
      body: 'Can you review the document I sent earlier?',
      isRead: true,
      sentAt: 1551133934594,
      removedAt: null,
      from: 'momo@momo.com',
      to: 'user5@appsus.com'
    },
    {
      id: 'e106',
      subject: 'Re: Quick Question',
      body: 'Sure, I will take a look and get back to you.',
      isRead: false,
      sentAt: 1551133935594,
      removedAt: null,
      from: 'momo@momo.com',
      to: 'user6@appsus.com'
    }
  ]
  

function query(filterBy) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            // if (filterBy.txt) {
            //     const regExp = new RegExp(filterBy.txt, 'i')
            //     mails = mails.filter(mail => regExp.test(mail.vendor))
            // }
            // if (filterBy.minSpeed) {
            //     mails = mails.filter(mail => mail.maxSpeed >= filterBy.minSpeed)
            // }
            return mails
        })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function getEmptyMail(subject = '', body = '', from = '', to = '') {
    return {
        id: '',
        subject: '',
        body: '',
        isRead: false,
        sentAt: 0,
        removedAt: null,
        from: '',
        to: ''
    }
}

function getDefaultFilter() {
    // return { txt: '', minSpeed: '', maxPrice: '' }
}

function getFilterFromQueryString(searchParams) {
    // const txt = searchParams.get('txt') || ''
    // const minSpeed = searchParams.get('minSpeed') || ''
    // const maxPrice = searchParams.get('maxPrice') || ''
    // return {
    //     txt,
    //     minSpeed,
    //     maxPrice
    // }
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        utilService.saveToStorage(MAIL_KEY, gDemoMails)
    }
}

// function _createMails() {
//     let mails = utilService.loadFromStorage(MAIL_KEY)
//     if (!mails || !mails.length) {
//         mails = []
//         mails.push(_createMail('audu', 300))
//         mails.push(_createMail('fiak', 120))
//         mails.push(_createMail('subali', 50))
//         mails.push(_createMail('mitsu', 150))
//         utilService.saveToStorage(MAIL_KEY, mails)
//     }
// }

// function _createMail(vendor, maxSpeed = 250) {
//     const mail = getEmptyMail(vendor, maxSpeed)
//     mail.id = utilService.makeId()
//     return mail
// }