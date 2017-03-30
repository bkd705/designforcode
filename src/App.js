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
      if (data.type === 'message') {
        const chatPath = '/chat/' + data.from_user.username

        if (chatPath !== this.props.router.location.pathname) {
          this.props.dispatch(addFlashMessage({
            type: 'success',
            text: `${data.from_user.username} sent you a message!`,
            link: chatPath
          }))
        }
      } else if (data.type === 'comment'){
        this.props.dispatch(addFlashMessage({
          type: 'success', text: `${data.from_user.username} commented on your post!`
        }))
      }

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
