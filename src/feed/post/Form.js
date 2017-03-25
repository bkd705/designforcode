import React from 'react'
import { connect } from 'react-redux'
import md5 from 'blueimp-md5'
import TransformObj from '../../util/TransformObj'
import TextArea from '../../form/TextArea'
import InputField from '../../form/InputField'

class PostForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      description: '',
      type: '',
      errors: {}
    }
  }

  onSubmit = (e) => {
    e.preventDefault()

    this.props.storePost(TransformObj(this.state, ['title', 'description', 'type']))
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleTypeChange = (e) => {
    this.setState({
      type: e.target.value
    })
  }

  render() {
    const { title, description, type, errors } = this.state
    const { user } = this.props
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
              <form onSubmit={this.onSubmit} className="post-form">
                <div className="field">
                  <InputField
                    name="title"
                    value={title}
                    placeholder="Post title"
                    onChange={this.onChange}
                    error={errors.title}
                  />
                </div>
                <div className="field textarea--grow">
                  <TextArea
                    name="description"
                    value={description}
                    placeholder="Post body"
                    onChange={this.onChange}
                    error={errors.description}
                  />
                </div>

                <div className="field">
                  <p className="control" onChange={this.handleTypeChange}>
                    <label className="radio">Looking for: </label>
                    <label className="radio">
                      <input type="radio" name="type" value="design" />
                      Design
                    </label>
                    <label className="radio">
                      <input type="radio" name="type" value="code" />
                      Code
                    </label>
                  </p>
                </div>

                <div className="field is-grouped">
                  <p className="control">
                    <button className="button is-primary" type="submit">Post</button>
                  </p>

                  <p className="control">
                    <button className="button is-link" type="submit" onClick={this.props.togglePostForm}>Cancel</button>
                  </p>
                </div>
              </form>
            </div>
          </article>
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

export default connect(mapStateToProps)(PostForm)