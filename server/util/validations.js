import Validator from 'validator'

function validateUser({ username, email, password }) {
  if(!username || !email || !password ) {
    return false
  }
  if(!Validator.isEmail(email)) {
    return false
  }

  return true
}

function validateProfile({ userId, firstName, lastName, age, profession, skillLevel, description }) {
  if(!userId || !firstName || !lastName || !age || !profession || !skillLevel || !description) {
    return false
  }
  if(age > 100 || age < 10) {
    return false
  }

  return true
}

export default {
  validateUser: validateUser,
  validateProfile: validateProfile
}