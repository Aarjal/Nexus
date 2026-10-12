import './style.css'
import { createIcons, Moon, Settings } from 'lucide'

const intervalKey = '__nexusClockInterval__'

if (typeof window[intervalKey] !== 'undefined') {
  window.clearInterval(window[intervalKey])
}

const greetingText = document.querySelector('#greeting-text')
const currentDate = document.querySelector('#current-date')
const timeRemaining = document.querySelector('#time-lebel')

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
})

const timeFormatter = new Intl.DateTimeFormat(undefined, {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
})

const getGreeting = (hour) => {
  if (hour >= 5 && hour < 12) return 'Good Morning.'
  if (hour < 17) return 'Good Afternoon.'
  if (hour < 21) return 'Good Evening.'
  return 'Good Night.'
}

const formatRemainingTime = (milliseconds) => {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000))
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return `${hours} hours ${minutes} minutes ${seconds} seconds`
}

const updateDashboardTime = () => {
  const now = new Date()
  const seconds = now.getSeconds()
  const minutes = now.getMinutes()
  const hours = now.getHours() % 12

  const hourHand = document.querySelector('.hour-hand')
  const minuteHand = document.querySelector('.minute-hand')
  const secondHand = document.querySelector('.second-hand')

  if (hourHand) {
  hourHand.style.transform= `translate(-50%) rotate(${hours * 30 + minutes * 0.5}deg)`
  }

  if (minuteHand) {
  minuteHand.style.transform= `translate(-50%) rotate(${minutes * 6 + seconds * 0.1}deg)`
  }

  if (secondHand) {
  secondHand.style.transform= `translate(-50%) rotate(${seconds * 6}deg)`
  }
  const nextMidnight = new Date(now)

  nextMidnight.setHours(24, 0, 0, 0)

  if (greetingText) {
    greetingText.textContent = getGreeting(now.getHours())
  }

  if (currentDate) {
    currentDate.textContent = dateFormatter.format(now)
  }

  if (timeRemaining) {
    timeRemaining.textContent = `Time remaining today: ${formatRemainingTime(nextMidnight - now)}`
  }
}

if (greetingText || currentDate || digitalTime || timeRemaining) {
  updateDashboardTime()
  window[intervalKey] = window.setInterval(updateDashboardTime, 1000)
}
createIcons({
  icons: {
    Moon,
    Settings,
  },
})
const addShortcutButton = document.querySelector('#add-shortcut')
const cancelShortcutButton = document.querySelector('#cancel-shortcut')
const shortcutNameInput = document.querySelector('#shortcut-name')
const shortcutForm = document.querySelector('#shortcut-form')

addShortcutButton.addEventListener('click', () =>{
  shortcutForm.hidden = false
  shortcutNameInput.focus()
})

cancelShortcutButton.addEventListener('click', ()=>{
  shortcutForm.reset()
  shortcutForm.hidden = true
})


const shortcutList = document.querySelector('#shortcut-list')
const emptyState = shortcutList.querySelector('.empty-state')

shortcutForm.addEventListener('submit', (event) => {
  event.preventDefault()

  const name = shortcutNameInput.value.trim()
  const urlInput = document.querySelector('#shortcut-url')
  const url = urlInput.value.trim()

  if (!name || !url) return

  const shortcut = document.createElement('a')
  shortcut.className = 'shortcut-item'
  shortcut.href = url
  shortcut.target = '_blank'
  shortcut.rel = 'noopener noreferrer'
  shortcut.textContent = name

  shortcutList.insertBefore(shortcut, addShortcutButton)

  emptyState.hidden = true
  shortcutForm.reset()
  shortcutForm.hidden = true
})

