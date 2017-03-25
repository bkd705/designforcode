import React from 'react'
import md5 from 'blueimp-md5'
import { connect } from 'react-redux'
import { addFlashMessage } from '../flashmessage/actions'
import Api from './api'
import './profile.css'

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
    const { user: { username, email }, profile: { first_name, last_name, description, profession, skill_level }} = this.state
    return (
      <div className="container profile">
        <div className="columns">
          <div className="column is-two-thirds">
            <div className="box">
              <div className="media">
                <div className="media-left">
                  <figure className="image is-128x128">
                    <img className="image--avatar" src={`https://www.gravatar.com/avatar/${md5(email)}?s=128x128`} alt={`${username}'s avatar`}/>
                  </figure>
                </div>

                <div className="media-content">
                  <div className="content">
                    <p>
                    <strong> { first_name } { last_name }</strong>  { username }
                    <br />
                    <small className="is-capital">{ skill_level } { profession }</small>
                    <br />
                    { description ? description : `${username} has no description. :(`}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="column is-one-third">
            <div className="box">
              <div className="content">
                <h4>Links</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(Profile)