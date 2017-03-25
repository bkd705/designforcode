import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import RequireAuth from '../util/RequireAuth'

import App from '../App'
import IndexRedirect from '../partials/IndexRedirect'
import Login from '../auth/login/Form'
import Signup from '../auth/signup/Form'
import ProfileForm from '../profile/Form'
import Chat from '../chat/Form'
import Feed from '../feed/Feed'

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={IndexRedirect} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />

      <Route path="/chat/:id" component={Chat} onEnter={RequireAuth} />
      <Route path="/feed" component={Feed} onEnter={RequireAuth} />
      <Route path="/profile/create" component={() => <ProfileForm isNew />} onEnter={RequireAuth} />
    </Route>
  </Router>
)

export default routes
