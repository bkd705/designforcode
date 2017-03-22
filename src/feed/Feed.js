import React from 'react'
import Api from './Api'
import Post from './post/Post'
import './feed.css'

class Feed extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      posts: [],
      filteredPosts: [],
      typeFilter: 'all',
    }
  }

  componentDidMount() {
    if(this.state.posts.length <= 0) {
       Api.fetchPosts()
      .then(res => {
        this.setState({
          posts: res.data.posts,
          filteredPosts: res.data.posts
        })
      })
      .catch(err => {
        console.log(err)
      })
    }
  }

  changeFilter = (e, filter) => {
    e.preventDefault()

    if(this.setState.typeFilter !== filter) {
      const newFilteredPosts = filter !== 'all' ? this.state.posts.filter(x => x.type === filter) : this.state.posts

      this.setState({
        typeFilter: filter,
        filteredPosts: newFilteredPosts
      })
    }
  }

  render() {
    const { typeFilter } = this.state
    return (
      <div className="container container--feed">
        <nav className="level">
          <div className="level-left">
            <div className="level-item">
              <p className="subtitle is-5">
                <strong>{this.state.filteredPosts.length}</strong> posts
              </p>
            </div>
            <div className="level-item">
              <div className="field has-addons">
                <p className="control">
                  <input className="input" type="text" placeholder="Find a post" />
                </p>
                <p className="control">
                  <button className="button">
                    Search
                  </button>
                </p>
              </div>
            </div>
          </div>

          <div className="level-right">
            <p className="level-item"><a onClick={(e) => this.changeFilter(e, 'all')}>{ typeFilter === 'all' ? <strong>All posts</strong> : 'All posts' }</a></p>
            <p className="level-item">Looking for:</p>
            <p className="level-item"><a onClick={(e) => this.changeFilter(e, 'design')}>{ typeFilter === 'design' ? <strong>Design</strong> : 'Design' }</a></p>
            <p className="level-item"><a onClick={(e) => this.changeFilter(e, 'code')}>{ typeFilter === 'code' ? <strong>Code</strong> : 'Code' }</a></p>
            <p className="level-item"><a className="button is-success">Create Yours</a></p>
          </div>
        </nav>
        <div className="feed">
          {this.state.filteredPosts.map(post => {
            return <Post post={post} key={post.id} />
          })}
        </div>
      </div>
    )
  }
}

export default Feed