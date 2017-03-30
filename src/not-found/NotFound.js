import React from 'react'
import Image from './404-image.png'
import './notfound.css'

class NotFound extends React.Component {
  render() {
    return (
      <div className="hero is-info is-bold is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            <img className="hero--image" src={Image} role="presentation" />

            <h1 className="title">404 Page Not Found</h1>
            <h2 className="subtitle">This is not the page you are looking for...</h2>
          </div>
        </div>
      </div>
    )
  }
}

export default NotFound
