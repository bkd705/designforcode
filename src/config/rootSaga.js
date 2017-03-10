import { default as authSaga } from '../auth/saga'

export default function * rootSaga () {
  yield [
    authSaga()
  ]
}
