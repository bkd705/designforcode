import React from 'react'
import Comment from './Comment'

class CommentList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      expanded: false
    }
  }

  toggleExpanded = (e) => {
    e.preventDefault()

    this.setState(prevState => ({
      expanded: !prevState.expanded
    }))
  }

  render() {
    const { comments } = this.props

    if(comments.length > 3 && !this.state.expanded) {
      const slicedComments = comments.slice(comments.length - 3, comments.length)

      return (
        <div className="box comments">
          {slicedComments.map(comment => {
            return <Comment comment={comment} key={comment.id} />
          })}

          <div className="comments-meta">
            <a onClick={this.toggleExpanded}>Show all comments</a>
            <small className="small--right">{`${slicedComments.length} of ${comments.length} comments`}</small>
          </div>
        </div>
      )
    } else {
      return (
        <div className="box comments">
          {comments.map(comment => {
            return <Comment comment={comment} key={comment.id} />
          })}

          { comments.length > 3 ? <div className="comments-meta"><a onClick={this.toggleExpanded}>Hide comments</a></div> : '' }
        </div>
      )
    }
  }
}

export default CommentList