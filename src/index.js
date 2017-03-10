import ReactDOM from 'react-dom'
import routes, { store } from './config/routes'
import { types } from './auth/actions'
import decode from 'jwt-decode'

if (localStorage.getItem('user_token')) {
  const token = localStorage.getItem('user_token')
  try {
    const decoded = decode(token)
    store.dispatch({ type: types.AUTH_LOGIN_SUCCESS, user: decoded, token: token })
  } catch (ex) {
    localStorage.removeItem('user_token')
    console.log(ex)
  }
}

ReactDOM.render(
  routes,
  document.getElementById('root')
)
