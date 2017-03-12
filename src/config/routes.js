import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import configureStore from './reduxStore'
import RequireAuth from '../util/RequireAuth'

import App from '../App'
import Home from '../home/Home'
import Login from '../auth/login/Form'
import Signup from '../auth/signup/Form'
import ProfileForm from '../profile/Form'
import Chat from '../chat/Form'

export const store = configureStore()

const routes = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/chat" component={Chat} />

        <Route path="/profile/create" component={() => <ProfileForm isNew />} onEnter={RequireAuth} />
      </Route>
    </Router>
  </Provider>
)
