import React from 'react'
import { connect } from 'react-redux'

import Home from '../home/Home'
import Feed from '../feed/Feed'

class IndexRedirect extends React.Component {
  render() {
    const { isAuth } = this.props

    if(isAuth) {
      return <Feed />
    } else {
      return <Home />
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps)(IndexRedirect)