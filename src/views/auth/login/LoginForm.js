import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { login } from '../actions'
import { validateLogin } from '../../../util/FormValidations'
import InputField from '../../../components/form/InputField'

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
      this.props.dispatch(login(this.state))
      this.context.router.push('/')
    }
  }

  render() {
    const { username, password, errors } = this.state
    return (
      <form onSubmit={this.onSubmit}>
        <InputField
          label="Username"
          name="username"
          value={username}
          placholder="Username"
          onChange={this.onChange}
          error={errors.username}
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

        <div className="control is-grouped">
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
