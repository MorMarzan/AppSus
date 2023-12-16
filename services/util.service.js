export const utilService = {
  makeId,
  makeLorem,
  getRandomInt,
  getRandomColor,
  padNum,
  getDayName,
  getMonthName,
  tsToDateString,
  formatTimestamp,
  generateRandomEmail,
  getRandomTimestamp,
  loadFromStorage,
  saveToStorage,
  debounce,
  formatDate,
}

function makeId(length = 6) {
  var txt = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return txt
}

function makeLorem(size = 100) {
    var words = [
      'The sky',
      'above',
      'the port',
      'was',
      'the color of television',
      'tuned',
      'to',
      'a dead channel',
      'all',
      'this happened',
      'more or less',
      'I',
      'heard the story',
      'bit by bit',
      'from various people',
      'and',
      'as generally',
      'happens',
      'in such cases',
      'each time',
      'it',
      'was',
      'a different story',
      'it',
      'was',
      'a pleasure',
      'to',
      'burn',
    ];
  
    var txt = '';
    while (size > 0) {
      size--;
      const word = words[Math.floor(Math.random() * words.length)];
  
      // Capitalize the first word of the sentence
      if (size === 0) {
        txt += word.charAt(0).toUpperCase() + word.slice(1);
      } else {
        txt += word;
      }
  
      txt += ' ';
    }
  
    return txt.trim(); // Remove trailing space
  }
  
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : undefined
}

function padNum(num) {
  return (num + '').padStart(2, '0')
}

function getRandomColor() {
  const letters = '0123456789ABCDEF'
  var color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

function getDayName(date, locale) {
  date = new Date(date)
  return date.toLocaleDateString(locale, { weekday: 'long' })
}

function getMonthName(date) {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  return monthNames[date.getMonth()]
}

function tsToDateString(timestamp) {
  const date = new Date(timestamp);
  const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  const dateString = date.toLocaleString(undefined, options);
  return dateString;
}

function formatTimestamp(timestamp) {
  const now = new Date()
  const date = new Date(timestamp)

  // Check if the date is today
  if (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  ) {
    // Check if it is in the last 24 hours
    const diffInMinutes = Math.floor((now - date) / (1000 * 60))
    if (diffInMinutes < 1) {
      return 'Now'
    } else if (diffInMinutes < 60) {
      const pluralS = diffInMinutes > 1 ? 's' : ''
      return `${diffInMinutes} minute${pluralS} ago`
    } else if (diffInMinutes < 60 * 24) {
      const diffInHours = Math.floor(diffInMinutes / 60)
      if (diffInHours === 1) {
        return '1 hour ago'
      } else if (diffInHours < 10) {
        return `${diffInHours} hours ago`
      }

      const hours = date.getHours().toString().padStart(2, '0')
      const minutes = date.getMinutes().toString().padStart(2, '0')
      return `today ${hours}:${minutes}`
    }
    return 'today'
  }

  // Check if it is in the same year
  if (date.getFullYear() === now.getFullYear()) {
    const month = date.toLocaleString('default', { month: 'short' })
    const day = date.getDate()
    return `${month} ${day}`
  }

  // If it was more than a year ago, display the year only
  const year = date.getFullYear().toString()
  return year
}

function generateRandomEmail() {
    const commonUsernames = [
      'john',
      'mary',
      'david',
      'emily',
      'alex',
      'susan',
      'brian',
      'linda',
      'peter',
      'kate',
    ];
  
    const commonDomains = [
      'gmail.com',
      'yahoo.com',
      'outlook.com',
      'hotmail.com',
      'aol.com',
    ];
  
    const randomUsername = commonUsernames[Math.floor(Math.random() * commonUsernames.length)];
    const randomDomain = commonDomains[Math.floor(Math.random() * commonDomains.length)];
  
    return `${randomUsername}@${randomDomain}`;
  }
  
function getRandomTimestamp() {
  const now = Date.now()
  const tenYearsAgo = now - 3 * 365 * 24 * 60 * 60 * 1000 // milliseconds in 3 years
  const randomTimestamp =
    Math.floor(Math.random() * (now - tenYearsAgo + 1)) + tenYearsAgo
  return randomTimestamp
}

function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

function formatDate(date) {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const formattedDate = year + '-' + month + '-' + day

  return formattedDate
}
