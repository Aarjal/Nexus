import './style.css'

const intervalKey = '__nexusClockInterval__'

if (typeof window[intervalKey] !== 'undefined') {
  window.clearInterval(window[intervalKey])
}

const greetingText = document.querySelector('#greeting-text')
const currentDate = document.querySelector('#current-date')
const digitalTime = document.querySelector('#digital-time')
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
  if (hour >= 5 && hour < 12) return 'Good morning.'
  if (hour < 17) return 'Good afternoon.'
  if (hour < 21) return 'Good evening.'
  return 'Good night.'
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
  const nextMidnight = new Date(now)

  nextMidnight.setHours(24, 0, 0, 0)

  if (greetingText) {
    greetingText.textContent = getGreeting(now.getHours())
  }

  if (currentDate) {
    currentDate.textContent = dateFormatter.format(now)
  }

  if (digitalTime) {
    digitalTime.textContent = timeFormatter.format(now)
    digitalTime.dateTime = [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, '0'),
      String(now.getDate()).padStart(2, '0'),
    ].join('-') +
      `T${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`
  }

  if (timeRemaining) {
    timeRemaining.textContent = `Time remaining today: ${formatRemainingTime(nextMidnight - now)}`
  }
}

if (greetingText || currentDate || digitalTime || timeRemaining) {
  updateDashboardTime()
  window[intervalKey] = window.setInterval(updateDashboardTime, 1000)
}

