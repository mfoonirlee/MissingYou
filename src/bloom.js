import Petal from './petal'
import Garden from './garden'

export default class Bloom {
  constructor(p, r, c, pc, garden) {
    this.p = p
    this.r = r
    this.c = c
    this.pc = pc
    this.petals = []
    this.garden = garden
    this.init()
    this.garden.addBloom(this)
  }

  draw() {
    let p
    let isfinished = true
    this.garden.ctx.save()
    this.garden.ctx.translate(this.p.x, this.p.y)
    for (let i = 0; i < this.petals.length; i += 1) {
      p = this.petals[i]
      p.render()
      isfinished *= p.isfinished
    }
    this.garden.ctx.restore()
    if (isfinished) {
      this.garden.removeBloom(this)
    }
  }

  init() {
    const angle = 360 / this.pc
    const startAngle = Garden.randomInt(0, 90)
    for (let i = 0; i < this.pc; i += 1) {
      this.petals.push(
        new Petal(
          Garden.random(Garden.options.petalStretch.min, Garden.options.petalStretch.max),
          Garden.random(Garden.options.petalStretch.min, Garden.options.petalStretch.max),
          startAngle + i * angle,
          angle,
          Garden.random(Garden.options.growFactor.min, Garden.options.growFactor.max), this,
        ),
      )
    }
  }
}
