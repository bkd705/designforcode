import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavigationBar from './partials/NavigationBar'

class App extends Component {
  render () {
    return (
      <div className='app'>
        <NavigationBar />
        {this.props.children}
      </div>
    )
  }
}

export default connect()(App)
