import './index.css'
import registerServiceWorker from './registerServiceWorker'
import Garden from './garden'

registerServiceWorker()

const code = document.getElementById('code')

const offsetX = 335
const offsetY = 625 / 2 - 55

const gardenCanvas = document.getElementById('garden')
gardenCanvas.width = 670
gardenCanvas.height = 625

const gardenCtx = gardenCanvas.getContext('2d')
gardenCtx.globalCompositeOperation = 'lighter'
const garden = new Garden(gardenCtx, gardenCanvas)

// renderLoop
setInterval(() => {
  garden.render()
}, Garden.options.growSpeed)

const getHeartPoint = (angle) => {
  const t = angle / Math.PI
  const x = 19.5 * (16 * (Math.sin(t) ** 3))
  const y =
    -20 * ((13 * Math.cos(t)) - (5 * Math.cos(2 * t)) - (2 * Math.cos(3 * t)) - Math.cos(4 * t))
  return [offsetX + x, offsetY + y]
}

const timeElapse = (date) => {
  const current = Date()
  let seconds = (Date.parse(current) - Date.parse(date)) / 1000
  const days = Math.floor(seconds / (3600 * 24))
  seconds %= (3600 * 24)
  let hours = Math.floor(seconds / 3600)
  if (hours < 10) {
    hours = `0${hours}`
  }
  seconds %= 3600
  let minutes = Math.floor(seconds / 60)
  if (minutes < 10) {
    minutes = `0${minutes}`
  }
  seconds %= 60
  if (seconds < 10) {
    seconds = `0${seconds}`
  }
  const result = `<span class="digit">${days}</span> 天 <span class="digit">${hours}</span> 小时 <span class="digit">${minutes}</span> 分 <span class="digit">${seconds}</span> 秒`
  document.getElementById('elapseClock').innerHTML = result
}

const adjustWordsPosition = () => {
  const words = document.getElementById('words')
  words.style.position = 'absolute'
  words.style.top = `${(
    gardenCanvas.getBoundingClientRect().top +
      gardenCanvas.getBoundingClientRect().bottom - gardenCanvas.getBoundingClientRect().top) / 3
  }px`
}

const showCopyrights = () => {
  const copyright = document.getElementById('copyright')
  copyright.style.visibility = 'visible'
}

const showCodes = () => {
  code.style.visibility = 'visible'

  Array.from(code.children).forEach((child) => {
    const str = child.innerHTML
    let progress = 0
    child.innerHTML = ''
    const timer = setInterval(() => {
      const current = str.substr(progress, 1)
      if (current === '<') {
        progress = str.indexOf('>', progress) + 1
      } else {
        progress += 1
      }
      child.innerHTML = str.substring(0, progress) + (progress % 2 ? '_' : '')
      if (progress >= str.length) {
        clearInterval(timer)
        showCopyrights()
      }
    }, 75)
  })
}


const showMessages = () => {
  adjustWordsPosition()
  const messages = document.getElementById('messages')
  messages.style.transition = 'opacity 5s'
  messages.style.opacity = '1'

  setTimeout(() => {
    showCodes()
  }, 1200)
}

const startHeartAnimation = () => {
  const interval = 50
  let angle = 10
  const heart = []
  const animationTimer = setInterval(() => {
    const bloom = getHeartPoint(angle)
    let draw = true
    for (let i = 0; i < heart.length; i += 1) {
      const p = heart[i]
      const distance = Math.sqrt(((p[0] - bloom[0]) ** 2) + ((p[1] - bloom[1]) ** 2))
      if (distance < Garden.options.bloomRadius.max * 1.3) {
        draw = false
        break
      }
    }
    if (draw) {
      heart.push(bloom)
      garden.createRandomBloom(bloom[0], bloom[1])
    }
    if (angle >= 30) {
      clearInterval(animationTimer)
      showMessages()
    } else {
      angle += 0.2
    }
  }, interval)
}


setTimeout(() => {
  startHeartAnimation()
}, 0)

const together = new Date()
together.setFullYear(2015, 8, 15)
together.setHours(0)
together.setMinutes(0)
together.setSeconds(0)
together.setMilliseconds(0)

timeElapse(together)

setInterval(() => {
  timeElapse(together)
}, 500)
