import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { validateLogin } from '../util/FormValidations'
import InputField from '../form/InputField'

class ProfileForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user_id: this.props.user.id,
      first_name: '',
      last_name: '',
      profession: '',
      skill_level: '',
      description: '',
      errors: {},
      helpers: {}
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  isValid = () => {
    const { isValid, errors } = validateLogin(this.state)

    if(!isValid) {
      this.setState({
        errors: errors
      })
      return false
    }

    return true
  }

  onSubmit = (e) => {
    e.preventDefault()

    if(this.isValid()) {
      console.log(this.state)
      this.context.router.push('/')
    }
  }

  render() {
    const { first_name, last_name, profession, skill_level, description, errors, helpers } = this.state

    const isNewSubHeading = ( <h4 className="subtitle">Create your profile now to help other understand who you are and what you do!</h4> )
    const isUpdateSubHeading = ( <h4 className="subtitle">Update your profile!</h4> )

    return (
      <section className="section">
      <div className="container">
        <div className="columns">    
          <div className="column is-half is-offset-one-quarter">
            <div className="heading">
              <h3 className="title">Login</h3>
              { this.props.isNew ? isNewSubHeading : isUpdateSubHeading}
            </div>
            <form onSubmit={this.onSubmit}>
              <InputField
                label="First Name"
                name="first_name"
                value={first_name}
                placholder="Username"
                onChange={this.onChange}
                error={errors.username}
              />

              <InputField
                label="Last Name"
                name="last_name"
                value={last_name}
                placholder="Password"
                onChange={this.onChange}
                error={errors.last_name}
              />


              <div className="control is-grouped">
                <p className="control">
                  <button className="button is-primary" type="submit">Save Profile</button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    )
  }
}

ProfileForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  user: state.auth.user
})

export default connect(mapStateToProps)(ProfileForm)
