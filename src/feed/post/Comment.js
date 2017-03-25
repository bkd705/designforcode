import React from 'react'
import md5 from 'blueimp-md5'
import { Link } from 'react-router'
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
            <img className="image--avatar" src={`https://www.gravatar.com/avatar/${md5(comment.user.email)}?s=128x128`} alt={`${comment.user.username}'s avatar`}/>
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

          { currentUser && currentUser.id === comment.user.id ? deleteButton : '' }
      </article>
    </div>
  )
}

export default Comment