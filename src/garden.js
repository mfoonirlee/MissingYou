import Vector from './vector'
import Bloom from './bloom'

export default class Garden {
  constructor(ctx, element) {
    this.blooms = []
    this.element = element
    this.ctx = ctx
  }

  render() {
    for (let i = 0; i < this.blooms.length; i += 1) {
      this.blooms[i].draw()
    }
  }

  addBloom(b) {
    this.blooms.push(b)
  }

  // eslint-disable-next-line consistent-return
  removeBloom(b) {
    let bloom
    for (let i = 0; i < this.blooms.length; i += 1) {
      bloom = this.blooms[i]
      if (bloom === b) {
        this.blooms.splice(i, 1)
        return this
      }
    }
  }

  createRandomBloom(x, y) {
    this.createBloom(
      x,
      y,
      Garden.randomInt(
        Garden.options.bloomRadius.min,
        Garden.options.bloomRadius.max,
      ),
      Garden.randomrgba(
        Garden.options.color.rmin,
        Garden.options.color.rmax,
        Garden.options.color.gmin,
        Garden.options.color.gmax,
        Garden.options.color.bmin,
        Garden.options.color.bmax,
        Garden.options.color.opacity,
      ),
      Garden.randomInt(
        Garden.options.petalCount.min,
        Garden.options.petalCount.max,
      ),
    )
  }

  createBloom(x, y, r, c, pc) {
    new Bloom(new Vector(x, y), r, c, pc, this)
  }

  clear() {
    this.blooms = []
    this.ctx.clearRect(0, 0, this.element.width, this.element.height)
  }

    static options = {
      petalCount: {
        min: 8,
        max: 15,
      },
      petalStretch: {
        min: 0.1,
        max: 3,
      },
      growFactor: {
        min: 0.1,
        max: 1,
      },
      bloomRadius: {
        min: 8,
        max: 10,
      },
      density: 10,
      growSpeed: 1000 / 60,
      color: {
        rmin: 128,
        rmax: 255,
        gmin: 0,
        gmax: 128,
        bmin: 0,
        bmax: 128,
        opacity: 0.1,
      },
      tanAngle: 60,
    }

    static random(min, max) {
      return Math.random() * (max - min) + min
    }

    static randomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min
    }

      static circle = 2 * Math.PI

      static degrad(angle) {
        return Garden.circle / 360 * angle
      }

      static raddeg(angle) {
        return angle / Garden.circle * 360
      }

      static rgba(r, g, b, a) {
        return `rgba(${r},${g},${b},${a})`
      }

      static randomrgba(rmin, rmax, gmin, gmax, bmin, bmax, a) {
        const r = Math.round(Garden.random(rmin, rmax))
        const g = Math.round(Garden.random(gmin, gmax))
        const b = Math.round(Garden.random(bmin, bmax))
        const limit = 5
        if (Math.abs(r - g) <= limit && Math.abs(g - b) <= limit && Math.abs(b - r) <= limit) {
          return Garden.rgba(rmin, rmax, gmin, gmax, bmin, bmax, a)
        }
        return Garden.rgba(r, g, b, a)
      }
}

