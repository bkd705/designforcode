import decode from 'jwt-decode'

export default (nextState, replace) => {
  const token = localStorage.getItem('user_token')
  if(!token) {
    replace({
      pathname: '/login',
      state: { nextPathName: nextState.location.pathname }
    })
  }

  try {
    const user = decode(token)
    if(!user) {
      replace({
        pathname: '/login',
        state: { nextPathName: nextState.location.pathname }
      })
    }

    if(!user.username || !user.id || !user.email) {
      replace({
        pathname: '/login',
        state: { nextPathName: nextState.location.pathname }
      })
    }
  } catch(ex) {
    replace({
      pathname: '/login',
      state: { nextPathName: nextState.location.pathname }
    })
  }
}