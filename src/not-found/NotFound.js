import React from 'react'

class NotFound extends React.Component {
  render() {
    return (
      <div className="container">
        <div style={styles.halfWindow}>
          <img
            style={{width: '30%'}}
            src="http://2.bp.blogspot.com/-HDaqALPnhXI/UZGAGckKX0I/AAAAAAAAGk8/AvqwWLjO9Ks/s1600/cartoon-turtle.png" />

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
    backgroundColor: '#3073da',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  }
}

export default NotFound
