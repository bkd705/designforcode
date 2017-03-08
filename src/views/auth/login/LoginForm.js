import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { login } from '../actions'
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

  onSubmit = (e) => {
    e.preventDefault()
    this.props.dispatch(login(this.state))
  }

  render() {
    const { username, email, password, errors } = this.state
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

export default connect()(LoginForm)
