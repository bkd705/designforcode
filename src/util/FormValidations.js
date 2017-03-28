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

  let validations = {
    user_id: true,
    first_name: true,
    last_name: true,
    profession: true,
    skill_level: true,
    dribbble_url: false,
    github_url: false,
    linkedin_url: false,
    portfolio_url: false,
    description: true
  }

  Object.keys(data).forEach(key => {
    if(key === 'helpers') return
    if(isEmpty(data[key]) && validations[key]) errors[key] = 'This field is required!'
  })

  return {
    isValid: isEmpty(errors),
    errors
  }
}
