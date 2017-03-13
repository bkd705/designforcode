import React from 'react'
import { Link } from 'react-router'
import io from 'socket.io-client'

class ChatForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      response: ''
    }

    const socket = io('http://localhost:3000')

    socket.on('connect', () => {
      socket.emit('join', {
        recipient_id: 'd6073e8d-542e-439d-8b33-91308a93ed10',
        token: "Bearer " + localStorage.getItem('user_token')
      })
    })

    socket.on('server-error', data => {
      console.log(data)

      this.setState({
        response: data.error
      })
    })

    socket.on('send-message-error', data => {
      console.log(data)

      this.setState({
        response: data.error
      })
    })

    socket.on('join-error', data => {
      console.log(data)

      this.setState({
        response: data.error
      })
    })

    socket.on('join-success', data => {
      console.log(data)

      this.setState({
        response: data.message
      })

      socket.emit('private-message', {
        msg: 'hey'
      })
    })
  }

  render() {
    return (
    <section className="section">
      <h1>{ this.state.response }</h1>
    </section>
    )
  }
}

ChatForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default ChatForm
