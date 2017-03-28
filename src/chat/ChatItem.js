import React from 'react'
import Avatar from '../user/Avatar'
import AgoDate from '../feed/post/AgoDate'

const ChatItem = ({ message, isCurrentUser, user }) => {
  if(isCurrentUser) {
    return (
      <article className="media">
          <div style={{width: '100%'}}>
            <div className="content has-text-right">
              <p>
                <span
                  style={{marginRight: '5px', color: 'darkgrey'}}>
                  <AgoDate date={message.created_at} />
                </span>
                <strong>{user.username}</strong>
                <br />
                <p style={{wordWrap: 'break-word'}}>{message.message}</p>
              </p>
            </div>
          </div>

          <div className="media-right">
            <figure className="image is-48x48">
              <Avatar email={user.email} username={user.username} />
            </figure>
          </div>
      </article>
    )
  } else {
    return (
      <article className="media">
        <div className="media-left">
          <figure className="image is-48x48">
            <Avatar email={user.email} username={user.username} />
          </figure>
        </div>

        <div style={{width: '100%'}}>
          <div className="content">
            <p>
              <strong>{user.username}</strong>
              <span
                style={{ marginLeft: '5px', color: 'darkgrey'}}>
                <AgoDate date={message.created_at} />
              </span>
              <br />
              <p style={{wordWrap: 'break-word'}}>{message.message}</p>
            </p>
          </div>
        </div>
      </article>
    )
  }
}

export default ChatItem
