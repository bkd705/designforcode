import React from 'react'
import { Link } from 'react-router'
import Avatar from '../../user/Avatar'
import AgoDate from './AgoDate'

const Comment = ({ comment, currentUser, deleteComment }) => {

  const deleteButton = (
    <nav className="level is-mobile meta-buttons">
      <div className="level-right">
        <a onClick={(e) => deleteComment(e, comment.id)} className="level-item is-danger">
          <span className="icon is-small">
            <i className="fa fa-trash"></i>
          </span>
        </a>
      </div>
    </nav>
  )

  return (
    <div className="comment">
      <article className="media">
        <div className="media-left">
          <figure className="image is-48x48">
            <Avatar email={comment.user.email} username={comment.user.username} />
          </figure>
        </div>
        <div className="media-content">
            <div className="content">
              <p>
                <Link to={`/profile/${comment.user.username}`}>{comment.user.username}</Link> <small><AgoDate date={comment.created_at}/></small>
                <br />

                {comment.body}
              </p>
            </div>
          </div>

          { currentUser && currentUser.id === comment.user.id && deleteButton }
      </article>
    </div>
  )
}

export default Comment