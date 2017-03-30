import React from 'react'
import { omit } from 'lodash'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { signup } from '../actions'
import { addNotification } from '../../notifications/actions'
import { validateSignup } from '../../util/FormValidations'
import TransformObj from '../../util/TransformObj'
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
    console.log('submit')
    if(this.isValid()) {
      const user = TransformObj(this.state, ['username', 'email', 'password'])
      this.props.dispatch(signup(user))
        .then(res => {
          if(res.success) {
            this.props.dispatch(addNotification({ type: 'success', text: 'Signed up successfully!' }))
            this.context.router.push('/profile/create')
          } else {
            this.props.dispatch(addNotification({ type: 'error', text: res.message }))
          }
        })
        .catch(err => {
          this.props.dispatch(addNotification({ type: 'error', text: err }))
        })
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
      fetch(`/api/v1/users/${field}/${value}`)
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
      <form onSubmit={this.onSubmit}>
        <div className="field">
          <label className="label">Username</label>
          <InputField
            label="Username"
            name="username"
            value={username}
            placeholder="Username"
            onChange={this.onChange}
            error={errors.username}
            helper={helpers.username}
            onBlur={this.checkExisting}
          />
        </div>

        <div className="field">
          <label className="label">E-Mail</label>
          <InputField
            label="E-Mail"
            name="email"
            value={email}
            placeholder="E-Mail"
            onChange={this.onChange}
            error={errors.email}
            helper={helpers.email}
            onBlur={this.checkExisting}
          />
        </div>

        <div className="field">
          <label className="label">Password</label>
          <InputField
            label="Password"
            name="password"
            value={password}
            type="password"
            placeholder="Password"
            onChange={this.onChange}
            error={errors.password}
          />
        </div>

        <div className="field">
          <label className="label">Confirm Password</label>
          <InputField
            label="Confirm Password"
            name="password_confirm"
            value={password_confirm}
            type="password"
            placeholder="Confirm Password"
            onChange={this.onChange}
            error={errors.password_confirm}
            onBlur={this.checkPasswordMatch}
          />
        </div>

        <div className="field is-grouped">
          <p className="control">
            <button className="button is-primary" type="submit">Sign Up</button>
          </p>
          <p className="control">
            <Link to="/"><button className="button is-link">Cancel</button></Link>
          </p>
        </div>
      </form>
    )
  }
}

SignupForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect()(SignupForm)
