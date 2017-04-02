import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { login } from '../actions'
import { addNotification } from '../../notifications/actions'
import { validateLogin } from '../../util/FormValidations'
import TransformObj from '../../util/TransformObj'
import InputField from '../../form/InputField'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      errors: {}
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  isValid = () => {
    const { isValid, errors } = validateLogin(
      TransformObj(this.state, ['username', 'password'])
    )

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
      const user = TransformObj(this.state, ['username', 'password'])
      this.props.dispatch(login(user))
        .then(res => {
          if(res.success) {
            this.props.dispatch(addNotification({ type: 'success', text: 'Welcome back!' }))
            this.context.router.push('/')
          } else {
            this.props.dispatch(addNotification({ type: 'error', text: res.message }))
          }
        })
        .catch(err => {
          this.props.dispatch(addNotification({ type: 'error', text: err }))
        })
    }
  }

  render() {
    const { username, password, errors } = this.state
    return (
      <form onSubmit={this.onSubmit}>
        <div className="field">
          <label className="label">Username</label>
          <InputField
            name="username"
            value={username}
            placeholder="Username"
            onChange={this.onChange}
            error={errors.username}
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

        <div className="field is-grouped">
          <p className="control">
            <button className="button is-primary" type="submit">Login</button>
          </p>
          <p className="control">
            <Link to="/signup"><button className="button is-link">Need an account?</button></Link>
          </p>
        </div>
      </form>
    )
  }
}

LoginForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect()(LoginForm)
