import React from 'react'
import { connect } from 'react-redux'
import md5 from 'blueimp-md5'
import { addFlashMessage } from '../../flashmessage/actions'
import AgoDate from './AgoDate'
import CommentForm from './CommentForm'
import CommentList from './CommentList'
import Api from '../Api'

class Post extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showCommentForm: false,
      expanded: false,
      comments: []
    }
  }

  componentWillMount() {
    if(this.props.post.comments.length > 0) {
      this.setState({
        comments: this.props.post.comments
      })
    }
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
            ],
            showCommentForm: false
          }))
        }
      })
      .catch(err => {
        this.props.dispatch(addFlashMessage({ type: 'error', text: `An unexpected error occurred saving comment: ${err}`}))
      })
  }

  deleteComment = (e, id) => {
    e.preventDefault()

    Api.deleteComment(id)
      .then(res => {
        if(res.success) {
          const commentsCopy = [ ...this.state.comments ]
          const index = commentsCopy.findIndex(x => x.id === id)

          this.setState({
            comments: [
              ...commentsCopy.slice(0, index),
              ...commentsCopy.slice(index + 1)
            ]
          })
        }
      })
      .catch(err => {
        this.props.dispatch(addFlashMessage({ type: 'error', text: `An unexpected error occurred deleting the comment: ${err}`}))
      })
  }

  toggleExpandedComments = (e) => {
    e.preventDefault()

    this.setState(prevState => ({
      expanded: !prevState.expanded
    }))
  }

  toggleCommentForm = (e) => {
    e.preventDefault()

    this.setState(prevState => ({
      showCommentForm: !prevState.showCommentForm
    }))
  }

  render() {
    const { post: { id, type, created_at, user, title, description }, deletePost } = this.props
    const { showCommentForm, expanded, comments } = this.state

    const postAuthButtons = (
      <nav className="level is-mobile">
        <div className="level-left">
          <a className="level-item">
            <span className="icon is-small"><i className="fa fa-pencil"></i></span>
          </a>

          <a className="level-item" onClick={(e) => deletePost(e, id)}>
            <span className="icon is-small"><i className="fa fa-trash"></i></span>
          </a>
        </div>
      </nav>
    )

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
                  <strong>{title}</strong> <a href={`/profile/${user.username}`}>
                  <small>{user.username}</small></a> <AgoDate date={created_at}/>
                  <span className="tag is-info pull-right">{ type === 'design' ? 'Design' : 'Code' }</span>
                  <br />

                  {description}
                </p>
              </div>

              { this.props.user.id === user.id ? postAuthButtons : '' }
            </div>
          </article>
        </div>

        { comments.length > 0 
        ? <CommentList 
            comments={comments} 
            expanded={expanded} 
            deleteComment={this.deleteComment} 
            toggleComments={this.toggleExpandedComments} 
          /> 
        : '' }

        <div className="box add-comment">
          { showCommentForm ? <CommentForm addComment={this.addComment} /> : <small><a onClick={this.toggleCommentForm}>Add a comment</a></small> }
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