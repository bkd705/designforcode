import React from 'react'
import { connect } from 'react-redux'
import md5 from 'blueimp-md5'
import AgoDate from './AgoDate'
import CommentForm from './CommentForm'
import CommentList from './CommentList'
import Api from '../Api'

class Post extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showComment: false,
      comments: []
    }
  }

  toggleCommentForm = (e) => {
    e.preventDefault()

    this.setState(prevState => ({
      showComment: !prevState.showComment
    }))
  }

  addComment = (comment) => {
    const newComment = {
      body: comment,
      user_id: this.props.user.id,
      post_id: this.props.post.id
    }

    Api.storeComment(newComment)
      .then(res => {
        if(res.success) {
          const commentWithUser = {
            ...res.data.comment,
            user: {
              id: this.props.user.id,
              username: this.props.user.username,
              email: this.props.user.email
            }
          }
          this.setState(prevState => ({
            comments: [
              ...prevState.comments,
              commentWithUser
            ]
          }))
        }
      })
  }

  render() {
    const { post: { id, created_at, updated_at, user, title, description } } = this.props
    const { showComment } = this.state

    const comments = [ ...this.props.post.comments, ...this.state.comments ]

    return (
      <div className="post">
        <div className="box">
          <article className="media">
            <div className="media-left">
              <figure className="image is-64x64">
                <img className="image--avatar" src={`https://www.gravatar.com/avatar/${md5(user.email)}?s=128x128`} alt={`${user.username}'s avatar`}/>
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

        { comments.length > 0 ? <CommentList comments={comments} /> : '' }

        <div className="box add-comment">
          { showComment ? <CommentForm addComment={this.addComment} /> : <small><a onClick={this.toggleCommentForm}>Add a comment</a></small> }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(Post)