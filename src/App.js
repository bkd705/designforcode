import React, { Component } from 'react'
import Alerts from './notifications/AlertsList'
import NavigationBar from './partials/NavigationBar'
import NotificationWrapper from './notifications/NotificationWrapper'

class App extends Component {
  render () {
    return (
      <div className='app'>
        <NavigationBar />
        <Alerts />
        {this.props.children}
      </div>
    )
  }
}

export default NotificationWrapper(App)
