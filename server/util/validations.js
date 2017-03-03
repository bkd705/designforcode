import Validator from 'validator'

export function validateUser({ username, email, password, role }) {
  if(!username || !email || !password || !role) {
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
