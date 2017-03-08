import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import configureStore from './reduxStore'

import App from '../App'
import Home from '../views/home'
import Login from '../views/auth/login'
import Signup from '../views/auth/signup'

export const store = configureStore()

const routes = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </Route>
    </Router>
  </Provider>
)

export default routes
