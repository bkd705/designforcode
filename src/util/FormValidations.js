import Validator from 'validator'
import { isEmpty } from 'lodash'

export function validateSignup (data) {
  let errors = {}

  Object.keys(data).forEach(key => {
    if (key === 'helpers') return
    if (isEmpty(data[key])) errors[key] = 'This field is required!'
  })

  if (!Validator.isEmail(data.email)) errors.email = 'Not a valid e-mail!'
  if (data.password !== data.password_confirm) errors.password_confirm = 'Passwords must match!'

  return {
    isValid: isEmpty(errors),
    errors
  }
}

export function validateLogin (data) {
  let errors = {}

  Object.keys(data).forEach(key => {
    if (key === 'helpers') return
    if (isEmpty(data[key])) errors[key] = 'This field is required!'
  })

  return {
    isValid: isEmpty(errors),
    errors
  }
}

export function validateProfile (data) {
  let errors = {}

  Object.keys(data).forEach(key => {
    if (key === 'helpers') return
    if (isEmpty(data[key])) errors[key] = 'This field is required!'
  })

  return {
    isValid: isEmpty(errors),
    errors
  }
}
