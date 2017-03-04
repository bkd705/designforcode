import axios from 'axios'
import { takeLatest, call, put } from 'redux-saga/effects'
import { types } from './actions'

const apiUrl = 'http://localhost:3000'

function* asyncLogin({ user }) {
  try {
    const response = yield call(axios.post, `${apiUrl}/user/login`, user)
    yield put({ type: types.AUTH_LOGIN_SUCCESS, user: response.data.user, token: response.data.token })
  } catch(err) {
    yield put({ type: types.AUTH_LOGIN_FAILURE, err: err })
  }
}

function* asyncSignup({ user }) {
  try {
    const response = yield call(axios.post, `${apiUrl}/user/create`, user)
    yield put({ type: types.AUTH_SIGNUP_SUCCESS, user: response.data.user, token: response.data.token })
  } catch(err) {
    yield put({ type: types.AUTH_SIGNUP_FAILURE, err: err })
  }
}

export function* watchLogin() {
  yield takeLatest(types.AUTH_LOGIN, asyncLogin)
}

export function* watchSignup() {
  console.log('signup watching')
  yield takeLatest(types.AUTH_SIGNUP, asyncSignup)
}

export default function* rootWatcher() {
  yield [
    watchLogin(),
    watchSignup()
  ]
}