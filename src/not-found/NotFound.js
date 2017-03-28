import React from 'react'
import Image from './404-image.png'

class NotFound extends React.Component {
  render() {
    return (
      <div className="container">
        <div style={styles.halfWindow}>
          <img
            style={{width: '30%'}}
            src={Image} />

          <h1 style={{color: 'whitesmoke', fontSize: '3em'}}>404 Page Not Found</h1>
          <p style={{color: 'whitesmoke'}}>This is not the page you are looking for...</p>
        </div>
      </div>
    )
  }
}

const styles = {
  halfWindow: {
    height: '400px',
    marginTop: '-1px',
    backgroundImage: 'linear-gradient(90deg, #1577c6 0, #3273dc 71%, #4366e5 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  }
}

export default NotFound
