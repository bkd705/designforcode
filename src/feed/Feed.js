import React from 'react'
import Api from './Api'
import Post from './post/Post'
import './feed.css'

class Feed extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    Api.fetchPosts()
      .then(res => {
        this.setState({
          posts: res.data.posts
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    console.log(this.state)
    return (
      <div className="container--feed">
        {this.state.posts.map(post => {
          return <Post post={post} key={post.id} />
        })}
      </div>
    )
  }
}

export default Feed