const AUTH_LOGIN = 'AUTH_LOGIN'
const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS'
const AUTH_LOGIN_FAILURE = 'AUTH_LOGIN_FAILURE'

const AUTH_SIGNUP = 'AUTH_SIGNUP'
const AUTH_SIGNUP_SUCCESS = 'AUTH_SIGNUP_SUCCESS'
const AUTH_SIGNUP_FAILURE = 'AUTH_SIGNUP_FAILURE'

export const types = {
  AUTH_LOGIN,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_SIGNUP,
  AUTH_SIGNUP_SUCCESS,
  AUTH_SIGNUP_FAILURE
}

export const login = (user) => {
  return {
    type: types.AUTH_LOGIN,
    user
  }
}

export const signup = (user) => {
  return {
    type: types.AUTH_SIGNUP,
    user
  }
}