import React from 'react'
import { connect } from 'react-redux'
import md5 from 'blueimp-md5'
import TextArea from '../../form/TextArea'

class CommentForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      comment: '',
      errors: {}
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.addComment(this.state.comment)
  }

  render() {
    const { comment, errors } = this.state
    
    return (
      <article className="media">
        <div className="media-left">
          <figure className="image is-48x48">
            <img src={`https://www.gravatar.com/avatar/${md5(this.props.user.email)}?s=128x128`} alt={`${this.props.user.username}'s avatar`}/>
          </figure>
        </div>

        <div className="media-content">
          <form onSubmit={this.onSubmit} className="comment-form">
            <label className="label">Your comment</label>
            <div className="field is-grouped">
              <TextArea
                name="comment"
                value={comment}
                placeholder="Add a comment"
                onChange={this.onChange}
                error={errors.comment}
              />

              <p className="control">
                <button className="button is-info">
                  Add
                </button>
              </p>
            </div>
          </form>
        </div>
      </article>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(CommentForm)