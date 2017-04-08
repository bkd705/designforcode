import React from 'react'
import { connect } from 'react-redux'
import { addNotification, changeActiveChat } from '../notifications/actions'
import ChatsList from './ChatsList'
import './styles.css'
import Chat from './chat/Chat'
import NewChat from './chat/NewChat.js'
import ResConst from '../util/ResponseConstants'

class Chats extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      chats: [],
      activeChat: {},
      newChatUser: '',
      isLoading: true,
      errors: {}
    }
  }

  componentDidMount() {
    // Fetch chats
    fetch(`/api/v1/users/${this.props.user.username}/chats`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('user_token')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      if(data.data.chats.length > 0) {
        this.setState({
          chats: data.data.chats,
          activeChat: data.data.chats[0].user,
          isLoading: false
        })
        this.props.dispatch(changeActiveChat(data.data.chats[0].user))
        if(this.props.params.username) {
          const activeChat = data.data.chats.filter(chat => chat.user.username === this.props.params.username)
          console.log(activeChat)
          if(activeChat.length > 0) {
            this.setState({
              chats: data.data.chats,
              activeChat: activeChat[0].user
            })
            this.props.dispatch(changeActiveChat(activeChat[0].user))
          } else {
            if(this.props.params.username === this.props.user.username) {
              this.props.dispatch(addNotification({ type: 'error', text: 'Cannot start a new chat with yourself... loner'}))
            } else {
              fetch(`/api/v1/users/${this.props.params.username}`)
                .then(res => res.json())
                .then(data => {
                  this.makeChat(data, 'mount')
                })
                .catch(err => {
                  this.props.dispatch(addNotification({ type: 'error', text: `An unexpected error occurred: ${err}` }))
                })
              }
          }
        }
      }
    })
    .catch(err => {
      this.context.router.push('/')
      this.props.dispatch(addNotification({ type: 'error', text: `An unexpected error occurred: ${err}` }))
    })
  }

  componentWillUnmount() {
    this.props.dispatch(changeActiveChat(null))
  }


  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  changeChat = (user) => {
    this.setState({
      activeChat: user
    })
    this.props.dispatch(changeActiveChat(user))
  }

  onClick = (e) => {
    e.preventDefault()
    if(this.state.newChatUser === this.props.user.username) {
      this.setState({
        errors: {
          newChatUser: 'Cannot start a chat with yourself.. loner'
        }
      })
    } else if (this.state.chats.filter(x => x.user.username === this.state.newChatUser).length > 0) {
      this.setState({
        errors: {
          newChatUser: 'Chat with this user already exists!'
        }
      })
    } else {
      fetch(`/api/v1/users/${this.state.newChatUser}`)
        .then(res => res.json())
        .then(data => {
          this.makeChat(data, 'form')
        })
        .catch(err => {
          this.props.dispatch(addNotification({ type: 'error', text: `An unexpected error occurred: ${err}` }))
          this.setState({
            errors: {
              newChatUser: err
            }
          })
        })
      }
  }

  makeChat = (data, from) => {
    if(data.message === ResConst.SHOW_USER_SUCCESS) {
      const chat = {
        user: {
          email: data.data.user.email,
          id: data.data.user.id,
          username: data.data.user.username
        }
      }
      this.setState({
        chats: [ ...this.state.chats, chat ],
        activeChat: chat.user
      })
      this.changeChat(chat.user)
    } else if (data.error === ResConst.USER_NOT_FOUND) {
      this.props.dispatch(addNotification({ type: 'error', text: `No user with that username was found :(` }))
      if(from === 'form') {
        this.setState({
          errors: {
            newChatUser: 'No user found.'
          }
        })
      }
    } else {
      this.props.dispatch(addNotification({ type: 'error', text: `An unexpected error occurred: ${data.message || data.error}` }))
      if(from === 'form') {
        this.setState({
          errors: {
            newChatUser: data.message || data.error
          }
        })
      }
    }
  }

  render() {
    const { isLoading } = this.state
    const NoChats = (
      <NewChat onChange={this.onChange} newChatUser={this.state.newChatUser} error={this.state.errors.newChatUser} onClick={this.onClick} />
    )

    return (
      <div className="chat-container">
        <div className="list-container">
          <ChatsList
            chats={this.state.chats}
            active={this.state.activeChat}
            changeChat={this.changeChat}
            newChatComponent={NoChats}
          />
        </div>
        <div className="messages-container">
          { isLoading ? '' : this.state.chats.length > 0
            ? <Chat chatWith={this.state.activeChat} />
            : NoChats }
        </div>
      </div>
    )
  }
}

Chats.contextTypes = {
  router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(Chats)
