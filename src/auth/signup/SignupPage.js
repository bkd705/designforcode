import React from 'react'
import SignupForm from './Form'

const SignupPage = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="columns">    
          <div className="column is-half is-offset-one-quarter">
            <div className="heading">
              <h3 className="title">Register</h3>
              <h4 className="subtitle">Sign up for an account today, and get immediate access to the app!</h4>
            </div>

            <SignupForm />
          </div>
        </div>
      </div>
    </section>
  )
}


export default SignupPage