import React from 'react'
import md5 from 'blueimp-md5'
import AgoDate from './AgoDate'

const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <article className="media">
        <div className="media-left">
          <figure className="image is-48x48">
            <img src={`https://www.gravatar.com/avatar/${md5(comment.user.email)}?s=128x128`} alt={`${comment.user.username}'s avatar`}/>
          </figure>
        </div>

        <div className="media-content">
            <div className="content">
              <p>
                <a href={`/profile/${comment.user.username}`}><small>{comment.user.username}</small></a> <AgoDate date={comment.created_at}/>
                <br />

                {comment.body}
              </p>
            </div>
          </div>
      </article>
    </div>
  )
}

export default Comment