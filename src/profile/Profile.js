import React from 'react'
import md5 from 'blueimp-md5'
import { connect } from 'react-redux'
import { addFlashMessage } from '../flashmessage/actions'
import Api from './api'
import Avatar from '../user/Avatar'
import ProfileGithubList from './ProfileGithubList'
import ProfileDribbbleList from './ProfileDribbbleList'
import Post from '../feed/post/Post'

import './profile.css'
import '../feed/feed.css'

class Profile extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      profile: {},
      user: {},
      gitRepos: [],
      dribbbleShots: [],
      posts: []
    }
  }

  componentDidMount() {
    if(this.props.params.username) {
      Api.fetchUser(this.props.params.username)
        .then(res => {
          if(res.success) {
            this.setState({
              profile: res.data.profile,
              user: res.data.user
            })
            res.data.profile.github_url ? this.fetchGithubRepos() : f => f
            res.data.profile.dribbble_url ? this.fetchDribbbleShots() : f => f
          } else {
            this.context.router.push('/')
            this.props.dispatch(addFlashMessage({ type: 'error', text: `An error occurred fetching profile: ${res.error}`}))
          }
        })
        .catch(err => {
          this.context.router.push('/')
          this.props.dispatch(addFlashMessage({ type: 'error', text: `An unexpected error occurred fetching profile: ${err}`}))
        })

      Api.fetchUserPosts(this.props.params.username, '?start=0&count=3')
        .then(res => {
          if(res.success) {
            this.setState({
              posts: res.data.posts
            })
          } else {
            this.props.dispatch(addFlashMessage({ type: 'error', text: `An error occurred fetching user posts: ${res.error}`}))
          }
        })
        .catch(err => {
          this.props.dispatch(addFlashMessage({ type: 'error', text: `An unexpected error occurred fetching user posts: ${err}`}))
        })
    }
  }

  fetchGithubRepos = () => {
    const gitUsername = new URL(this.state.profile.github_url).pathname.replace('/', '')
    if (!gitUsername) return

    fetch(`https://api.github.com/users/${gitUsername}/repos`)
        .then(res => res.json())
        .then(data => {
          this.setState(prevState => ({
            gitRepos: [ ...data.slice(0, 4) ]
          }))
        })
        .catch(err => {
          this.props.dispatch(addFlashMessage({ type: 'error', text: `An unexpected error occurred fetching repos: ${err}`}))
        })
  }

  fetchDribbbleShots = () => {
    const dUsername = new URL(this.state.profile.dribbble_url).pathname.replace('/', '')
    if (!dUsername) return

    fetch(`https://api.dribbble.com/v1/users/${ dUsername }/shots?access_token=6ed972085fecb7078ef53a3056562c05de38514ebd7d095b6a84f6dba7743031`)
        .then(res => res.json())
        .then(data => {
          this.setState(prevState => ({
            dribbbleShots: [ ...data.slice(0, 3) ]
          }))
        })
        .catch(err => {
          this.props.dispatch(addFlashMessage({ type: 'error', text: `An unexpected error occurred fetching shots: ${err}`}))
        })
  }

  render() {
    const { user: { username, email }, profile: { first_name, last_name, description, profession, skill_level, dribbble_url, github_url, linkedin_url, portfolio_url }, gitRepos, dribbbleShots} = this.state

    const messageButton = (
      <button
        className="button is-primary msg-btn"
        onClick={() => this.context.router.push(`/chat/${username}`)}>
        Send Message
      </button>
    )

    return (
      <div className="container profile">
        <div className="columns">
          <div className="column is-two-thirds">
            <div className="box">
              <div className="media">
                <div className="media-left">
                  <figure className="image is-128x128">
                    <Avatar email={email} username={username}/>
                  </figure>

                  { this.props.user.id !== this.state.user.id && messageButton }
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

                <p>
                  <strong>Github: </strong> <a href={github_url} alt="Github Link">{github_url}</a>
                  <br />
                  <strong>Dribbble: </strong> <a href={dribbble_url} alt="Github Link">{dribbble_url}</a>
                  <br />
                  <strong>LinkedIn: </strong> <a href={linkedin_url} alt="Github Link">{linkedin_url}</a>
                  <br />
                  <strong>Portfolio: </strong> <a href={portfolio_url} alt="Github Link">{portfolio_url}</a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="columns">
          <div className="column">
            <div className="box">
              <div className="content">
                <h4>Github Repos</h4>
                <ProfileGithubList repos={gitRepos} />

                <h4>Dribbble Projects</h4>
                <ProfileDribbbleList shots={dribbbleShots} />

                <br />
                <h4>Recent Posts</h4>
                <div className="feed" style={{margin: '0 auto'}}>
                  { this.state.posts.map(post => {
                    return <Post post={post} key={post.id} />
                  }) }
                  <p>{ (this.state.posts.length === 0) ? 'This user has no posts :(' : '' }</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Profile.contextTypes = {
  router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(Profile)
