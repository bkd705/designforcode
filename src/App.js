import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavigationBar from './partials/NavigationBar'
import FlashMessages from './flashmessage/FlashMessageList'

class App extends Component {
  render () {
    return (
      <div className='app'>
        <NavigationBar />
        <FlashMessages />
        {this.props.children}
      </div>
    )
  }
}

export default connect()(App)
