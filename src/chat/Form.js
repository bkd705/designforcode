import React from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import InputField from '../form/InputField'

class ChatForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      response: '',
      message: '',
      messages: [],
      socket: null,
      errors: {}
    }
  }

  componentDidMount() {
    const socket = io('http://localhost:3000')
    this.setState({
      socket: socket
    })

    socket.on('connect', () => {
      socket.emit('join', {
        recipient_name: this.props.params.username,
        token: "Bearer " + localStorage.getItem('user_token')
      })
    })

    socket.on('private-message', data => {
      this.setState(prevState => ({
        response: data.message,
        messages: [
          ...prevState.messages,
          data.data.message
        ]
      }))
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

    socket.on('send-message-success', data => {
      console.log('sent', data)

      this.setState({
        response: data.message
      })
    })

    socket.on('send-message-error', data => {
      console.log(data)

      this.setState({
        response: data.error
      })
    })

    socket.on('fetch-messages-error', data => {
      console.log(data)

      this.setState({
        response: data.error
      })
    })

    socket.on('fetch-messages-success', data => {
      this.setState({
        response: data.message,
        messages: data.data.messages
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

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault()

    this.sendMessage()
  }

  sendMessage = () => {
    this.state.socket.emit('send-message', {
      recipient_name: this.props.params.username,
      token: "Bearer " + localStorage.getItem('user_token'),
      message: this.state.messages
    })
  }

  render() {
    console.log(this.state)
    return (
      <div className="container">
        <div className="columns">
          <div className="column is-three-quarters is-offset-one-eight">
            <div className="box">
              <div className="media">
                <ul>
                  { this.state.messages.map(message => {
                    return <li key={message.id} style={ message.sender_id === this.props.user.id ? { color: 'red' } : { color: 'blue' }}>{message.message}</li>
                  })}
                </ul>
                <form onSubmit={this.onSubmit}>
                  <div className="field">
                    <InputField
                      name="message"
                      value={this.state.message}
                      placeholder="Enter your message..."
                      onChange={this.onChange}
                      error={this.state.errors.message}
                    />
                  </div>
                  <input type="submit" hidden/>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ChatForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(ChatForm)
