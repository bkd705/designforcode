import React from 'react'

const Post = ( { post: { id, created_at, updated_at, title, description, comments } } ) => {
  return (
    <div className="box">
      <div className="media-content">
        <div className="content">
          <p>
            <strong>{title}</strong> <small>{created_at}</small>
            <br />

            {description}
          </p>

          <ul>
            {comments.map(comment => {
              return <li key={comment.id}>{comment.body}</li>
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Post