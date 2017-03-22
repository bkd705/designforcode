import React from 'react'
import { Link } from 'react-router'
import io from 'socket.io-client'

class ChatForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      response: '',
      socket: null
    }
  }

  componentDidMount() {
    const socket = io('http://localhost:3000')
    this.setState({
      socket: socket
    })

    socket.on('connect', () => {
      socket.emit('join', {
        recipient_id: this.props.params.id,
        token: "Bearer " + localStorage.getItem('user_token')
      })
    })

    socket.on('private-message', data => {
      console.log(data)

      this.setState({
        response: data.message
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
    })
  }

  sendMessage = (e) => {
    this.state.socket.emit('send-message', {
      recipient_id: this.props.params.id,
      token: "Bearer " + localStorage.getItem('user_token'),
      message: 'hey there'
    })
  }

  render() {
    return (
      <section className="section">
        <h1>{ this.state.response }</h1>
        <button onClick={ this.sendMessage }>Send Msg </button>
      </section>
    )
  }
}

ChatForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default ChatForm
