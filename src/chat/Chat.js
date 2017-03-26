import React from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import { addFlashMessage } from '../flashmessage/actions'
import ChatList from './ChatList'
import ChatForm from './ChatForm'
import './chat.css'

class Chat extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      response: '',
      message: '',
      messages: [],
      socket: null,
      receiver: {},
      errors: {}
    }
  }

  componentDidMount() {
    const socket = io('http://localhost:3000')
    fetch(`/api/v1/users/${this.props.params.username}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({
          receiver: data.data,
          socket: socket
        })
      })
      .catch(err => {
        this.context.router.push('/')
        this.props.dispatch(addFlashMessage({ type: 'error', text: `An unexpected error occurred: ${err}` }))
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
      this.props.dispatch(addFlashMessage({ type: 'error', text: `An unexpected error occurred: ${data.error}` }))
      this.setState({
        response: data.error
      })
    })

    socket.on('send-message-error', data => {
      this.props.dispatch(addFlashMessage({ type: 'error', text: `An error occurred sending message: ${data.error}` }))
      this.setState({
        response: data.error
      })
    })

    socket.on('send-message-success', data => {
      this.setState({
        response: data.message
      })
    })

    socket.on('fetch-messages-error', data => {
      this.props.dispatch(addFlashMessage({ type: 'error', text: `An error occurred fetching messages: ${data.error}` }))
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
      this.props.dispatch(addFlashMessage({ type: 'error', text: `An error occurred joining chat: ${data.error}` }))
      this.setState({
        response: data.error
      })
    })

    socket.on('join-success', data => {
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
      message: this.state.message
    })

    let msg = {
      id: Math.floor((Math.random() * 1000) + 1),
      sender_id: this.props.user.id,
      message: this.state.message
    }

    this.setState(prevState => ({
      messages: [
        ...prevState.messages,
        msg
      ],
      message: ''
    }))
  }

  render() {
    return (
      <div className="container">
        <div className="chat--container">
          <h2 className="subtitle has-text-center">Chat with {this.props.params.username}</h2>
          <div className="box">
            <ChatList messages={this.state.messages} sender={this.props.user} receiver={this.state.receiver.user} />
          </div>
          <ChatForm
              onSubmit={this.onSubmit}
              onChange={this.onChange}
              messageValue={this.state.message}
              errors={this.state.errors}
            />
        </div>
      </div>
    )
  }
}

Chat.contextTypes = {
  router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(Chat)
