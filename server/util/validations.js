import Validator from 'validator'

export function validateUser({ username, email, password }) {
  if(!username || !email || !password) {
    return false
  }
  if(!Validator.isEmail(email)) {
    return false
  }

  return true
}

export function validateProfile({ first_name, last_name, profession, skill_level, description, user_id }) {
  if( !first_name || !last_name || !profession || !skill_level || !description || !user_id ) {
    return false
  }

  return true
}
