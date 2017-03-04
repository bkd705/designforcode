import React from 'react'
import { Link } from 'react-router'

class NavigationBar extends React.Component {
  render() {
    return (
      <section className="hero is-primary is-medium">
        <div className="hero-head">
          <header className="nav">
            <div className="container">
              <div className="nav-left">
                <Link to="/" className="nav-item">
                  <h2 className="subtitle"><strong>Design For Code</strong></h2>
                </Link>
              </div>
              <span className="nav-toggle">
                <span></span>
                <span></span>
                <span></span>
              </span>
              
              <div className="nav-right nav-menu">
                <Link to="/login" className="nav-item">Login</Link>
                <Link to="/signup" className="nav-item">Sign up</Link>
              </div>
            </div>
          </header>
        </div>
      </section>
    )
  }
}

export default NavigationBar