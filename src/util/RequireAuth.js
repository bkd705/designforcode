import decode from 'jwt-decode'
import { addFlashMessage } from '../flashmessage/actions'
import { store } from '../index'

export default (nextState, replace) => {
  const token = localStorage.getItem('user_token')
  if(!token) {
    replace({
      pathname: '/login',
      state: { nextPathName: nextState.location.pathname }
    })
    store.dispatch(addFlashMessage({ type: 'error', text: 'Please login to access this page!' }))
  }

  try {
    const user = decode(token)
    if(!user) {
      replace({
        pathname: '/login',
        state: { nextPathName: nextState.location.pathname }
      })
      store.dispatch(addFlashMessage({ type: 'error', text: 'Please login to access this page!' }))
    }

    if(!user.username || !user.id || !user.email) {
      replace({
        pathname: '/login',
        state: { nextPathName: nextState.location.pathname }
      })
      store.dispatch(addFlashMessage({ type: 'error', text: 'Please login to access this page!' }))
    }
  } catch(ex) {
    replace({
      pathname: '/login',
      state: { nextPathName: nextState.location.pathname }
    })
  }
}