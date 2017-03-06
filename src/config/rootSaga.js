import { default as authSaga } from '../views/auth/saga'

export default function* rootSaga() {
  yield [
    authSaga()
  ]
}