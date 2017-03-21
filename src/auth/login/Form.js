import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { login } from '../actions'
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
      const user = TransformObj(this.state, ['username', 'password'])
      this.props.dispatch(login(user))
        .then(res => {
          this.context.router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  render() {
    const { username, password, errors } = this.state
    return (
      <section className="section">
      <div className="container">
        <div className="columns">    
          <div className="column is-half is-offset-one-quarter">
            <div className="heading">
              <h3 className="title">Login</h3>
              <h4 className="subtitle">Log into your account now to access the app!</h4>
            </div>
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
          </div>
        </div>
      </div>
    </section>
    )
  }
}

LoginForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect()(LoginForm)
