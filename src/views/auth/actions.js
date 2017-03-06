const AUTH_LOGIN = 'AUTH_LOGIN'
const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS'
const AUTH_LOGIN_FAILURE = 'AUTH_LOGIN_FAILURE'

const AUTH_SIGNUP = 'AUTH_SIGNUP'
const AUTH_SIGNUP_SUCCESS = 'AUTH_SIGNUP_SUCCESS'
const AUTH_SIGNUP_FAILURE = 'AUTH_SIGNUP_FAILURE'

const AUTH_LOGOUT = 'AUTH_LOGOUT'

export const types = {
  AUTH_LOGIN,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_SIGNUP,
  AUTH_SIGNUP_SUCCESS,
  AUTH_SIGNUP_FAILURE,
  AUTH_LOGOUT
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

export const logout = () => {
  return {
    type: types.AUTH_LOGOUT
  }
}