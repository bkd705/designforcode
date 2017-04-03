import React from 'react'
import { connect } from 'react-redux'
import { addNotification } from './actions'
import io from 'socket.io-client'
import { logout } from '../auth/actions'

export default function(ComposedComponent) {
  class NotificationWrapper extends React.Component {
    state = {
      socket: null
    }
    componentDidMount() {
      if(this.props.isAuthenticated) {
        this.connectSocket()
      }
    }

    componentDidUpdate(prevProps) {
      if(prevProps.isAuthenticated !== this.props.isAuthenticated && this.props.isAuthenticated) {
        this.connectSocket()
      } else if (prevProps.isAuthenticated !== this.props.isAuthenticated && !this.props.isAuthenticated) {
        console.log('disconnecting socket')
        this.state.socket.disconnect()
      }
    }

    connectSocket = () => {
      const socket = io()

      this.setState({
        socket: socket
      })

      socket.on('connect', () => {
        socket.emit('hook-notifications', {
          token: "Bearer " + localStorage.getItem('user_token')
        })
      })

      socket.on('notification', data => {
        console.log(data)
        if (data.type === 'message') {
          const chatPath = '/chat/' + data.from_user.username

          if (chatPath !== this.props.router.location.pathname) {
            this.props.dispatch(addNotification({
              type: 'info',
              text: `${data.from_user.username} sent you a message!`,
              link: chatPath
            }))
          }
        } else if (data.type === 'comment'){
          this.props.dispatch(addNotification({
            type: 'info', text: `${data.from_user.username} commented on your post!`
          }))
        }

        // TODO: ADD TO GLOBAL NOTIFICATIONS
      })

      socket.on('hook-notifications-error', data => {
        if (data.error === 'USER_NOT_FOUND') {
          this.props.dispatch(logout())
        }
      })
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      )
    }
  }

  const mapStateToProps = (state) => {
    return {
      isAuthenticated: state.auth.isAuthenticated
    }
  }
  return connect(mapStateToProps)(NotificationWrapper)
}
