export default class Vector {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  rotate(theta) {
    const x = this.x
    const y = this.y
    this.x = Math.cos(theta) * x - Math.sin(theta) * y
    this.y = Math.sin(theta) * x + Math.cos(theta) * y
    return this
  }

  mult(f) {
    this.x *= f
    this.y *= f
    return this
  }

  clone() {
    return new Vector(this.x, this.y)
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  subtract(v) {
    this.x -= v.x
    this.y -= v.y
    return this
  }

  set(x, y) {
    this.x = x
    this.y = y
    return this
  }
}

