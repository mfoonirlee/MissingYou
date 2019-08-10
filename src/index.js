import './index.css'
import registerServiceWorker from './registerServiceWorker'
import Garden from './garden'

registerServiceWorker()


const gardenCanvas = document.getElementById('garden')
gardenCanvas.width = window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight
const scalePixel = (pixel) => pixel / 670 * gardenCanvas.width

gardenCanvas.height = scalePixel(625)
gardenCanvas.style.paddingTop = `${(window.innerHeight - gardenCanvas.height) / 2 * 0.618}px`
const offsetX = gardenCanvas.width / 2
const offsetY = gardenCanvas.height / 2 - scalePixel(55)


const gardenCtx = gardenCanvas.getContext('2d')
gardenCtx.globalCompositeOperation = 'lighter'
const garden = new Garden(gardenCtx, gardenCanvas)

// renderLoop
setInterval(() => {
  garden.render()
}, Garden.options.growSpeed)

const getHeartPoint = (angle) => {
  const t = angle / Math.PI
  const x = scalePixel(19.5) * (16 * (Math.sin(t) ** 3))
  const y = -scalePixel(20) *
    ((13 * Math.cos(t)) - (5 * Math.cos(2 * t)) - (2 * Math.cos(3 * t)) - Math.cos(4 * t))
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


const showMessages = () => {
  document.getElementById('messageTitle').innerText = 'I`m missing you'
  document.querySelector('#message').innerHTML = `
    <p>我们 漂浮在茫茫人海</p>
    <p style="margin-bottom: 15px">未来 如星火忽明忽暗</p>
    <p>而我握着 名为“缘”的线头</p>
    <p>仍期待着 与“八月”的故事</p>
  `

  const messages = document.getElementById('messages')
  const gardenCanvasRect = gardenCanvas.getBoundingClientRect()
  messages.style.position = 'absolute'
  const rate = window.innerWidth > window.innerHeight ? 0.281 : 0.223
  messages.style.top = `${parseFloat(gardenCanvas.style.paddingTop) + gardenCanvasRect.height * rate}px`
  messages.style.transition = 'opacity 5s'
  messages.style.opacity = '1'
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
together.setFullYear(2019, 1, 17)
together.setHours(0)
together.setMinutes(0)
together.setSeconds(0)
together.setMilliseconds(0)

timeElapse(together)

setInterval(() => {
  timeElapse(together)
}, 500)
