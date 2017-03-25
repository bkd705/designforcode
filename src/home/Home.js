import React from 'react'
import LoginForm from '../auth/login/Form'
import './home.css'

const Home = () => {
  return (
    <div className="hero is-info is-small is-bold">
      <div className="hero-body">
        <div className="container">
          <div className="columns">
            <div className="column is-half is-hero-half">
              <h1 className="title">Design For Code</h1>
              <h2 className="subtitle">Trade your design skills for code, and vice versa!</h2>
            </div>
            <div className="column is-half hero-form">
              <div className="box">
                <h1 className="title">Log in now!</h1>
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home