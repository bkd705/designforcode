import React from 'react'
import { omit } from 'lodash'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { signup } from '../actions'
import { validateSignup } from '../../util/FormValidations'
import InputField from '../../form/InputField'

class SignupForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      email: '',
      password: '',
      password_confirm: '',
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
    const { isValid, errors } = validateSignup(this.state)

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
      this.props.dispatch(signup(this.state))
      this.context.router.push('/')
    }
  }

  checkPasswordMatch = () => {
    if(this.state.password !== this.state.password_confirm) {
      this.setState({
        errors: {
          ...this.state.errors,
          password_confirm: 'Passwords do not match.'
        }
      })
    } else {
      const errorsCopy = omit(this.state.errors, 'password_confirm')
      this.setState({
        errors: errorsCopy
      })
    }
  }

  checkExisting = (e) => {
    const field = e.target.name
    const value = this.state[field]

    if(value.length > 0) {
      fetch(`/user/${field}/${value}`)
      .then(res => res.json())
      .then(res => {
        if(!res.success) {
          const newErrors = this.state.errors
          newErrors[field] = res.error
          this.setState({
            errors: newErrors
          })
        } else {
          const errorsCopy = omit(this.state.errors, field)
          const newHelpers = this.state.helpers
          newHelpers[field] = `${field} available!`
          this.setState({
            errors: errorsCopy,
            helpers: newHelpers
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
    } else if (value.length === 0) {
      const errorsCopy = omit(this.state.errors, field)

      this.setState({
        errors: errorsCopy
      })
    }
  }

  render() {
    const { username, email, password, password_confirm, errors, helpers } = this.state
    return (
      <section className="section">
        <div className="container">
          <div className="columns">    
            <div className="column is-half is-offset-one-quarter">
              <div className="heading">
                <h3 className="title">Register</h3>
                <h4 className="subtitle">Sign up for an account today, and get immediate access to the app!</h4>
              </div>
              <form onSubmit={this.onSubmit}>
                <InputField
                  label="Username"
                  name="username"
                  value={username}
                  placholder="Username"
                  onChange={this.onChange}
                  error={errors.username}
                  helper={helpers.username}
                  onBlur={this.checkExisting}
                />

                <InputField
                  label="E-Mail"
                  name="email"
                  value={email}
                  placholder="E-Mail"
                  onChange={this.onChange}
                  error={errors.email}
                  helper={helpers.email}
                  onBlur={this.checkExisting}
                />

                <InputField
                  label="Password"
                  name="password"
                  value={password}
                  type="password"
                  placholder="Password"
                  onChange={this.onChange}
                  error={errors.password}
                />

                <InputField
                  label="Confirm Password"
                  name="password_confirm"
                  value={password_confirm}
                  type="password"
                  placholder="Confirm Password"
                  onChange={this.onChange}
                  error={errors.password_confirm}
                  onBlur={this.checkPasswordMatch}
                />

                <div className="control is-grouped">
                  <p className="control">
                    <button className="button is-primary" type="submit">Sign Up</button>
                  </p>
                  <p className="control">
                    <Link to="/"><button className="button is-link">Cancel</button></Link>
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

SignupForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect()(SignupForm)
