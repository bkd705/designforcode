import React from 'react'
import Avatar from '../user/Avatar'

const ChatItem = ({ message, isCurrentUser, user }) => {
  const date = new Date(message.created_at).toLocaleString()

  if(isCurrentUser) {
    return (
      <article className="media">
          <div className="media-content">
            <div className="content has-text-right">
              <p>
                <span
                  style={{fontSize: '12px', marginRight: '10px', color: 'darkgrey'}}>
                  {date}
                </span>
                <strong>{user.username}</strong>
                <br />
                {message.message}
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

        <div className="media-content">
          <div className="content">
            <p>
              <strong>{user.username}</strong>
              <span
                style={{fontSize: '12px', marginLeft: '10px', color: 'darkgrey'}}>
                {date}
              </span>
              <br />
              {message.message}
            </p>
          </div>
        </div>
      </article>
    )
  }
}

export default ChatItem
