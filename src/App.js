import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavigationBar from './partials/NavigationBar'
import FlashMessages from './flashmessage/FlashMessageList'
import { addFlashMessage } from './flashmessage/actions'

import io from 'socket.io-client'

class App extends Component {
  componentDidMount() {
    // Return if no user token present
    if (!localStorage.getItem('user_token')) return

    const socket = io()

    socket.on('connect', () => {
      socket.emit('hook-notifications', {
        token: "Bearer " + localStorage.getItem('user_token')
      })
    })

    socket.on('notification', data => {
      this.props.dispatch(addFlashMessage({
        type: 'success', text: `${data.from_user.username} commented on your post`
      }))

      // TODO: ADD TO GLOBAL NOTIFICATIONS
    })
  }

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

export default connect()(App)
