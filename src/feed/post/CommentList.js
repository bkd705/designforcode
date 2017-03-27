import React from 'react'
import { connect } from 'react-redux'
import Comment from './Comment'

const CommentList = ({ comments, expanded, currentUser, deleteComment, toggleComments }) => {
  if(comments.length > 3 && !expanded) {
    const slicedComments = comments.slice(comments.length - 3, comments.length)

    return (
      <div className="comments--list">
        {slicedComments.map(comment => {
          return <Comment comment={comment} deleteComment={deleteComment} currentUser={currentUser} key={comment.id} />
        })}

        <div className="comments-meta">
          <a onClick={toggleComments}>Show all comments</a>
          <small className="small--right">{`${slicedComments.length} of ${comments.length} comments`}</small>
        </div>
      </div>
    )
  } else {
    return (
      <div className="comments--list">
        {comments.map(comment => {
          return <Comment comment={comment} deleteComment={deleteComment} currentUser={currentUser} key={comment.id} />
        })}

        { comments.length > 3 && <div className="comments-meta"><a onClick={toggleComments}>Hide comments</a></div> }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.user
  }
}

export default connect(mapStateToProps)(CommentList)