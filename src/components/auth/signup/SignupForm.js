import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { signup } from '../actions'
import InputField from '../../form/InputField'

class SignupForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      email: '',
      password: '',
      password_confirm: '',
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

    this.props.dispatch(signup(this.state))
  }

  render() {
    const { username, email, password, password_confirm, errors } = this.state
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
          label="E-Mail"
          name="email"
          value={email}
          placholder="E-Mail"
          onChange={this.onChange}
          error={errors.email}
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
    )
  }
}

export default connect()(SignupForm)