import api from './api'

const AUTH_LOGIN = 'AUTH_LOGIN'
const AUTH_SIGNUP = 'AUTH_SIGNUP'
const AUTH_LOGOUT = 'AUTH_LOGOUT'

const AUTH_SET_USER = 'AUTH_SET_USER'
const AUTH_USER_ERROR = 'AUTH_USER_ERROR'

export const types = {
  AUTH_LOGIN,
  AUTH_SIGNUP,
  AUTH_LOGOUT,
  AUTH_SET_USER,
  AUTH_USER_ERROR
}

const setUser = (data) => {
  return {
    type: AUTH_SET_USER,
    user: data.user,
    token: data.token
  }
}

export const login = (user) => {
  return dispatch => {
   return api.login(user)
      .then(res => {
        if(!res.success) {
          return Promise.reject(res.error)
        }

        dispatch(setUser(res.data))
        return res
      })
  }
}

export const signup = (user) => {
  return dispatch => {
   return api.signup(user)
      .then(res => {
        if(!res.success) {
          return Promise.reject(res.error)
        }

        dispatch(setUser(res.data))
        return res
      })
  }
}

export const logout = () => {
  return {
    type: types.AUTH_LOGOUT
  }
}
