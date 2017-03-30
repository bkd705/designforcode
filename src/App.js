import React, { Component } from 'react'
import FlashMessages from './flashmessage/FlashMessageList'
import NavigationBar from './partials/NavigationBar'
import NotificationWrapper from './partials/NotificationWrapper'

class App extends Component {
  render () {
    return (
      <div className='app'>
        <NavigationBar />
        <FlashMessages />
        {this.props.children}
      </div>
    )
  }
}

export default NotificationWrapper(App)
