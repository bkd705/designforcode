import { default as authSaga } from '../components/auth/saga'

export default function* rootSaga() {
  yield [
    authSaga()
  ]
}