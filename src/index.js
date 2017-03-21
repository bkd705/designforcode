import React from 'react'
import ReactDOM from 'react-dom'
import decode from 'jwt-decode'
import routes from './config/routes'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './config/rootReducer'
import { types } from './auth/actions'


const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)


if (localStorage.getItem('user_token')) {
  const token = localStorage.getItem('user_token')
  try {
    const decoded = decode(token)
    store.dispatch({ type: types.AUTH_SET_USER, user: decoded, token: token })
  } catch (ex) {
    localStorage.removeItem('user_token')
    console.log(ex)
  }
}

ReactDOM.render(
  <Provider store={store}>
    {routes}  
  </Provider>,
  document.getElementById('root')
)
