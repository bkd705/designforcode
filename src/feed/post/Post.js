import React from 'react'
import md5 from 'blueimp-md5'
import AgoDate from './AgoDate'
import Comment from './Comment'
import CommentForm from './CommentForm'

const Post = ( { post: { id, created_at, updated_at, user, title, description, comments } } ) => {
  return (
    <div className="post">
      <div className="box">
        <article className="media">
          <div className="media-left">
            <figure className="image is-64x64">
              <img src={`https://www.gravatar.com/avatar/${md5(user.email)}?s=128x128`} alt={`${user.username}'s avatar`}/>
            </figure>
          </div>
          <div className="media-content">
            <div className="content">
              <p>
                <strong>{title}</strong> <a href={`/profile/${user.username}`}><small>{user.username}</small></a> <AgoDate date={created_at}/>
                <br />

                {description}
              </p>
            </div>
          </div>
        </article>
      </div>

      <div className="box comments">
            {comments.map(comment => {
              return <Comment comment={comment} key={comment.id}/>
            })}
      </div>

      <div className="box add-comment">
        <CommentForm />
      </div>
    </div>
  )
}

export default Post