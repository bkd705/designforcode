import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { logout } from '../auth/actions'

class NavigationBar extends React.Component {

  logout = (e) => {
    e.preventDefault()
    this.props.dispatch(logout())
  }

  render() {
    const authLinks = (
      <div className="nav-right nav-menu">
        <Link onClick={this.logout} className="nav-item">Logout</Link>
      </div>
    )

    const notAuthLinks = (
      <div className="nav-right nav-menu">
        <Link to="/login" className="nav-item">Login</Link>
        <Link to="/signup" className="nav-item">Sign up</Link>
      </div>
    )

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
              
              { this.props.isAuthenticated ? authLinks : notAuthLinks }
            </div>
          </header>
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps)(NavigationBar)