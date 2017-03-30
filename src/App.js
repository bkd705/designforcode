import React, { Component } from 'react'
import Notifications from './notifications/NotificationList'
import NavigationBar from './partials/NavigationBar'
import NotificationWrapper from './notifications/NotificationWrapper'

class App extends Component {
  render () {
    return (
      <div className='app'>
        <NavigationBar />
        <Notifications />
        {this.props.children}
      </div>
    )
  }
}

export default NotificationWrapper(App)
