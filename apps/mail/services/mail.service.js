import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
import { localStorageService } from '../../../services/storage.service.js'

const MAIL_KEY = 'mailDB'

const gDemoMails = [
  {
    id: 'e101',
    subject: 'Project Update!',
    body: 'I hope this message finds you well. I wanted to provide a brief update on our ongoing project. The team has made significant progress, and we are excited about the upcoming milestones. Please review the attached document for more details. Your feedback is highly appreciated.',
    isRead: false,
    sentAt: Date.now() - 86400000, // 24 hours ago
    removedAt: null,
    from: 'user1111111111111111@appsus.com',
    to: 'me@appsus.com',
  },
  {
    id: 'e102',
    subject: 'Re: Miss you!',
    body: 'Sure, let\'s plan something!',
    isRead: false,
    sentAt: Date.now() - 3600000, // 1 hour ago
    removedAt: null,
    from: 'user2@appsus.com',
    to: 'me@appsus.com',
  },
  {
    id: 'e103',
    subject: 'Weekend Plans?',
    body: 'How about a movie on Saturday?',
    isRead: true,
    sentAt: Date.now() - 172800000, // 2 days ago
    removedAt: null,
    from: 'user3@appsus.com',
    to: 'momo@momo.com',
  },
  {
    id: 'e104',
    subject: 'Meeting Tomorrow',
    body: 'Don\'t forget about our meeting at 10 AM',
    isRead: false,
    sentAt: Date.now() - 604800000, // 7 days ago
    removedAt: null,
    from: 'momo@momo.com',
    to: 'user4@appsus.com'
  },
  {
    id: 'e105',
    subject: 'Quick Question',
    body: 'Can you review the document I sent earlier?',
    isRead: true,
    sentAt: Date.now() - 31536000000, // More than a year ago
    removedAt: null,
    from: 'momo@momo.com',
    to: 'user5@appsus.com'
  },
  {
    id: 'e106',
    subject: 'Re: Quick Question',
    body: 'Sure, I will take a look and get back to you.',
    isRead: false,
    sentAt: Date.now() - 2592000000, // 30 days ago
    removedAt: null,
    from: 'momo@momo.com',
    to: 'user6@appsus.com'
  },
  {
    id: 'e107',
    subject: 'Coffee Meeting?',
    body: 'Hey, would you like to grab coffee sometime this week? I found a cozy place downtown that we haven\'t tried yet. Let me know your availability!',
    isRead: false,
    sentAt: Date.now() - 86400000 * 2, // 2 days ago
    removedAt: null,
    from: 'friend1@appsus.com',
    to: 'momo@momo.com',
  },
  {
    id: 'e108',
    subject: 'Important Update - Project XYZ',
    body: 'Dear team, I wanted to share some important updates regarding Project XYZ. Please find the attached document for a detailed overview. Your prompt review and feedback are highly appreciated.',
    isRead: true,
    sentAt: Date.now() - 86400000 * 5, // 5 days ago
    removedAt: null,
    from: 'pm@appsus.com',
    to: 'momo@momo.com',
  },
  {
    id: 'e109',
    subject: 'Happy Birthday!',
    body: 'Wishing you a fantastic birthday filled with joy and happiness! May this year bring you success and fulfillment in all your endeavors. Enjoy your special day!',
    isRead: false,
    sentAt: Date.now() - 2592000000 * 2, // 60 days ago
    removedAt: null,
    from: 'birthdaygreetings@appsus.com',
    to: 'momo@momo.com',
  },
  {
    id: 'e110',
    subject: 'New Recipe Alert!',
    body: 'Check out our latest recipe for a delicious and healthy smoothie. It\'s quick to make and packed with nutrients. Let us know what you think!',
    isRead: true,
    sentAt: Date.now() - 1728000000, // 20 days ago
    removedAt: null,
    from: 'recipes@appsus.com',
    to: 'momo@momo.com',
  },
  {
    id: 'e111',
    subject: 'Questionnaire for Feedback',
    body: 'Dear user, we value your opinion. Please take a moment to complete our questionnaire and share your thoughts. Your feedback is crucial for improving our services.',
    isRead: false,
    sentAt: Date.now() - 604800000 * 3, // 21 days ago
    removedAt: null,
    from: 'feedback@appsus.com',
    to: 'momo@momo.com',
  },
]
const gLoggedinUser = {
  email: 'me@appsus.com',
  fullname: 'Mahatma Appsus'
}


_createMails()

console.log('hi from mail service!')

export const mailService = {
  query,
  get,
  remove,
  save,
  getEmptyMail,
  getDefaultFilter,
  // getFilterFromQueryString
}

function query(filterBy) {
  return storageService.query(MAIL_KEY)
    .then(mails => {
      if (filterBy.status) {
        switch (filterBy.status) {
          case 'inbox':
            mails = mails.filter(mail => mail.to === gLoggedinUser.email);
            break;
          case 'sent':
            mails = mails.filter(mail => mail.from === gLoggedinUser.email && mail.sentAt !== 0);
            break;
          case 'draft':
            mails = mails.filter(mail => mail.from === gLoggedinUser.email && !mail.removedAt);
            break;
          case 'starred':
            mails = mails.filter(mail => mail.isStarred);
            break;
          // Add more cases as needed
          default:
            // Handle unknown status
            break;
        }
      }
      if (filterBy.txt) {
        // const regExp = new RegExp(filterBy.txt, 'i')
        // mails = mails.filter(mail => regExp.test(mail.subject) || regExp.test(mail.body))
      }
      mails.sort((a, b) => b.sentAt - a.sentAt);
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

function getEmptyMail(subject = '', body = '', to = '') {
  return {
    id: '',
    subject,
    body,
    isRead: true,
    isStarred: false,
    sentAt: 0,
    removedAt: null,
    from: gLoggedinUser.email,
    to
  }
}

function getDefaultFilter() {
  return {
    status: '',
    txt: '',
    isRead: '',
    isStarred: '',
    labels: []
  }
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
  let mails = localStorageService.loadFromStorage(MAIL_KEY)
  if (!mails || !mails.length) {
    _createDemoMails()
    // localStorageService.saveToStorage(MAIL_KEY, gDemoMails)
  }
}

function _createDemoMails() {
  const mailSubjects = [
    'Meeting Tomorrow',
    'Project Update',
    'Vacation Plans',
    'Urgent: Action Required',
    'Feedback Needed',
    'Weekly Report',
    'Conference Call Agenda',
    'Important Announcement',
    'Travel Itinerary',
    'Review Meeting Notes',
    'Invoice Attached',
    'Product Launch Details',
    'New Feature Proposal',
    'Appointment Confirmation',
    'Thank You for Your Purchase'
  ]

  const mails = mailSubjects.map((mailSubject) => {
    const to = Math.random() < 0.5 ? utilService.generateRandomEmail() : gLoggedinUser.email;
    const body = utilService.makeLorem(15)
    const mail = _createMail(mailSubject, body, to)
    if (to === gLoggedinUser.email) mail.isRead = Math.random() < 0.5
    mail.isStarred = Math.random() < 0.5
    mail.sentAt = utilService.getRandomTimestamp()
    mail.removedAt = Math.random() < 0.5 ? utilService.getRandomTimestamp() : null
    mail.from = (to === gLoggedinUser.email) ? utilService.generateRandomEmail() : gLoggedinUser.email
    return mail
  })
  // return mails
  localStorageService.saveToStorage(MAIL_KEY, mails)
}


function _createMail(subject, body, to) {
  const mail = getEmptyMail(subject, body, to)
  mail.id = utilService.makeId()
  return mail
}