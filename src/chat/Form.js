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
        recipient_id: 'c32b7e4b-2f27-4380-81ac-970bd0c1c16c',
        token: "Bearer " + localStorage.getItem('user_token')
      })
    })

    socket.on('join-error', data => {
      console.log("ERROR")
      this.setState({
        response: data.error
      })
    })

    socket.on('join-success', data => {
      console.log("SUCCESS")
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
