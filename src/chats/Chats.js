import React from 'react'
import { connect } from 'react-redux'
import { addNotification } from '../notifications/actions'
import ChatsList from './ChatsList'
import './styles.css'
import Chat from './chat/Chat'

class Chats extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      chats: [],
      activeChat: null
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
      this.setState({
        chats: data.data.chats
      })
    })
    .catch(err => {
      this.context.router.push('/')
      this.props.dispatch(addNotification({ type: 'error', text: `An unexpected error occurred: ${err}` }))
    })
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
  }

  render() {
    return (
      <div className="chat-container">
        <div className="list-container">
          <ChatsList
            chats={this.state.chats}
            active={this.state.activeChat}
            changeChat={this.changeChat} />
        </div>
        <div className="messages-container">
          {
            (this.state.activeChat) ?
            <Chat chatWith={this.state.activeChat} /> :
            'TODO: MAKE START NEW CHAT HERE' 
          }
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
