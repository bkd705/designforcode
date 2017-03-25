import React from 'react'
import { connect } from 'react-redux'
import { addFlashMessage } from '../flashmessage/actions'
import Api from './api'

class Profile extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      profile: {},
      user: {}
    }
  }

  componentWillMount() {
    if(this.props.params.username) {
      Api.fetchUser(this.props.params.username)
        .then(res => {
          if(res.success) {
            this.setState({
              profile: res.data.profile,
              user: res.data.user
            })
          }
        })
        .catch(err => {
          this.props.dispatch(addFlashMessage({ type: 'error', text: `An unexpected error occurred fetching profile: ${err}`}))
        })
    }
  }

  render() {
    const { user: { username, email }, profile: { description, profession, skill_level }} = this.state
    return (
      <div className="container profile">
        <div className="box">
          { username }
          { email }
          { description }
          { profession }
          { skill_level }
        </div>
      </div>
    )
  }
}

export default connect()(Profile)