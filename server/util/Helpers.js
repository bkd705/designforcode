'use strict'

import indicative from 'indicative'
import JRes from './JResponse'

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

  static transformArray(original, values) {
    if (typeof values !== 'object') return original

    let temp = []
    for (let i = 0; i < original.length; i++) {
      temp.push(this.transformObj(original[i], values))
    }

    return temp
  }

  static * validate(data, rules) {
    const valid = indicative
    .validateAll(data, rules)
    .then(success => {
      return JRes.success('All fields are valid')
    })
    .catch(errors => {
      return JRes.failure('Some fields did not pass validation', { errors })
    })

    return valid
  }
}
