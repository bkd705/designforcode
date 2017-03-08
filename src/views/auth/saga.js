import { takeLatest, call, put } from 'redux-saga/effects'
import api from './api'
import { types } from './actions'

function* asyncLogin({ user }) {
  try {
    const response = yield call(api.login, user)
    yield put({ type: types.AUTH_LOGIN_SUCCESS, user: response.data.user, token: response.data.token })
  } catch(err) {
    yield put({ type: types.AUTH_LOGIN_FAILURE, err: err })
  }
}

function* asyncSignup({ user }) {
  try {
    const response = yield call(api.signup, user)
    console.log(response)
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