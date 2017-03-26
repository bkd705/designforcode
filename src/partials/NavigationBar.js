import React from 'react'
import { connect } from 'react-redux'
import md5 from 'blueimp-md5'
import { Link } from 'react-router'
import { addFlashMessage } from '../flashmessage/actions'
import { logout } from '../auth/actions'

class NavigationBar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      navExpanded: false
    }
  }

  logout = (e) => {
    e.preventDefault()
    this.props.dispatch(logout())
    this.context.router.push('/')
    this.props.dispatch(addFlashMessage({ type: 'success', text: 'Come back soon!' }))
  }

  toggleNav = () => {
    this.setState(prevState => ({
      navExpanded: !prevState.navExpanded
    }))
  }

  render() {
    const authLinks = (
      <div className={`nav-right nav-menu ${this.state.navExpanded && 'is-active'}`}>
        <Link to={`/profile/${this.props.user.username}`} className="nav-item">
          <figure className="image is-24x24" style={{marginRight: '8px'}}>
            <img className="image--avatar" src={`https://www.gravatar.com/avatar/${md5(this.props.user.email)}?s=128x128`} alt={`${this.props.user.username}'s avatar`}/>
          </figure>
          Profile
        </Link>
        <Link onClick={this.logout} className="nav-item">Logout</Link>
      </div>
    )

    const notAuthLinks = (
      <div className={`nav-right nav-menu ${this.state.navExpanded && 'is-active'}`}>
        <Link to="/login" className="nav-item">Login</Link>
        <Link to="/signup" className="nav-item">Sign up</Link>
      </div>
    )

    return (
      <section className="hero is-info is-medium is-bold">
        <div className="hero-head">
          <header className="nav">
            <div className="container">
              <div className="nav-left">
                <Link to="/" className="nav-item">
                  <h2 className="subtitle"><strong>Design For Code</strong></h2>
                </Link>
              </div>
              <span className="nav-toggle" onClick={this.toggleNav}>
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

NavigationBar.contextTypes = {
  router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps)(NavigationBar)