import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import configureStore from './reduxStore'

import App from '../App'
import Home from '../components/home'
import Login from '../components/auth/login'
import Signup from '../components/auth/signup'

const store = configureStore()

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
