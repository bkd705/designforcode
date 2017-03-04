import { types } from './actions'

const initialState = {
  user: {
    username: '',
    email: ''
  },
  token: '',
  isAuthenticated: false,
  error: ''
}

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case types.AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        token: action.token,
        isAuthenticated: true,
      }
    case types.AUTH_LOGIN_FAILURE:
      return {
        ...state,
        error: action.err
      }
    case types.AUTH_SIGNUP_SUCCESS:
      return {
        ...state,
        user: action.user,
        token: action.token,
        isAuthenticated: true,
      }
    case types.AUTH_SIGNUP_FAILURE:
      return {
        ...state,
        error: action.err
      }
    default: return state
  }
}