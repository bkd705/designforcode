import React from 'react'
import LoginForm from './LoginForm'

const Login = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="columns">    
          <div className="column is-half is-offset-one-quarter">
            <div className="heading">
              <h3 className="title">Login</h3>
              <h4 className="subtitle">Log into your account now to access the app!</h4>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login