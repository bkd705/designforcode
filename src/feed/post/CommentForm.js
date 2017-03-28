import React from 'react'
import { connect } from 'react-redux'
import Avatar from '../../user/Avatar'
import InputField from '../../form/InputField'

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

    this.setState({
      comment: ''
    })
  }

  render() {
    const { comment, errors } = this.state

    return (
      <article className="media comment-form--container">
        <div className="media-left">
          <figure className="image is-48x48">
            <Avatar email={this.props.user.email} username={this.props.user.username} />
          </figure>
        </div>

        <div className="media-content">
          <form onSubmit={this.onSubmit} className="comment-form">
            <div className="field is-grouped">
              <InputField
                name="comment"
                value={comment}
                placeholder="Add a comment"
                onChange={this.onChange}
                error={errors.comment}
                autocomplete="off"
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
