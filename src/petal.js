import Vector from './vector'
import Garden from './garden'

export default class Petal {
  constructor(stretchA, stretchB, startAngle, angle, growFactor, bloom) {
    this.stretchA = stretchA
    this.stretchB = stretchB
    this.startAngle = startAngle
    this.angle = angle
    this.bloom = bloom
    this.growFactor = growFactor
    this.r = 1
    this.isfinished = false
  }

  draw() {
    const ctx = this.bloom.garden.ctx
    const v1 = new Vector(0, this.r).rotate(Garden.degrad(this.startAngle))
    const v2 = v1.clone().rotate(Garden.degrad(this.angle))
    const v3 = v1.clone().mult(this.stretchA) // .rotate(this.tanAngleA)
    const v4 = v2.clone().mult(this.stretchB) // .rotate(this.tanAngleB)
    ctx.strokeStyle = this.bloom.c
    ctx.beginPath()
    ctx.moveTo(v1.x, v1.y)
    ctx.bezierCurveTo(v3.x, v3.y, v4.x, v4.y, v2.x, v2.y)
    ctx.stroke()
  }

  render() {
    if (this.r <= this.bloom.r) {
      this.r += this.growFactor // / 10
      this.draw()
    } else {
      this.isfinished = true
    }
  }
}
