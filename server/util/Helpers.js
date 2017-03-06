'use strict'

export default class Helpers {
  static transformObj(original, values) {
    if (typeof values !== 'object') return original

    let temp = {}
    values.forEach(value => {
      if (original[value] !== undefined) {
        temp[value] = original[value]
      }
    })

    return temp
  }
}
