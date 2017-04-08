import React from 'react'
import { connect } from 'react-redux'
import Api from './Api'
import { addNotification } from '../notifications/actions'
import Post from './post/Post'
import PostForm from './post/Form'
import Pagination from '../pagination/PaginationList'
import './feed.css'

class Feed extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      posts: [],
      filteredPosts: [],
      totalPosts: 0,
      typeFilter: 'all',
      showPostForm: false,
      searchTxt: '',
      currentPage: 0,
      pages: 0
    }
  }

  componentDidMount() {
    if(this.state.posts.length <= 0) {
       Api.fetchPosts(0, 10)
        .then(res => {
          this.setState({
            posts: res.data.posts,
            filteredPosts: res.data.posts,
            pages: res.data.total / 10,
            totalPosts: res.data.total,
            currentPage: 1
          })
        })
        .catch(err => {
          this.props.dispatch(addNotification({ type: 'error', text: `An unexpected error occurred fetching posts: ${err}`}))
        })
    }
  }

  onChange = (e) => {
    this.setState({
      searchTxt: e.target.value
    })

    if(e.target.value.length === 0) {
      this.search()
    }
  }

  search = (e) => {
    if(e) e.preventDefault()

    Api.searchPosts(this.state.searchTxt)
     .then(res => {
       this.setState({
         posts: res.data.posts,
         filteredPosts: res.data.posts
       })
     })
     .catch(err => {
       this.props.dispatch(addNotification({ type: 'error', text: `An unexpected error occurred fetching posts: ${err}`}))
     })
  }

  storePost = (post) => {
    Api.storePost(post)
      .then(res => {
        if(res.success) {
          const postWithUser = {
            ...res.data.post,
            user: {
              id: this.props.user.id,
              username: this.props.user.username,
              email: this.props.user.email
            },
            comments: []
          }
          this.setState(prevState => ({
            posts: [
              postWithUser,
              ...prevState.posts
            ],
            filteredPosts: [
              postWithUser,
              ...prevState.posts
            ],
            typeFilter: 'all',
            showPostForm: false
          }))
        }
      })
      .catch(err => {
        this.props.dispatch(addNotification({ type: 'error', text: `An unexpected error occurred saving post: ${err}`}))
      })
  }

  deletePost = (e, id) => {
    Api.deletePost(id)
      .then(res => {
        if(res.success) {
          const postsCopy = [ ...this.state.posts ]
          const filteredPostsCopy = [ ...this.state.filteredPosts ]
          const index = postsCopy.findIndex(x => x.id === id)

          this.setState({
            filteredPosts: [
              ...filteredPostsCopy.slice(0, index),
              ...filteredPostsCopy.slice(index + 1)
            ],
            posts: [
              ...postsCopy.slice(0, index),
              ...postsCopy.slice(index + 1)
            ]
          })

          this.props.dispatch(addNotification({ type: 'success', text: 'Post deleted successfully!'}))
        }
      })
      .catch(err => {
        this.props.dispatch(addNotification({ type: 'error', text: `An unexpected error occurred deleting the post: ${err}`}))
      })
  }

  changeFilter = (e, filter) => {
    e.preventDefault()

    // TODO after zach has made the API route
  }

  togglePostForm = (e) => {
    e.preventDefault()

    this.setState(prevState => ({
      showPostForm: !prevState.showPostForm
    }))
  }

  changePage = (e, newPage) => {
    e.preventDefault()

    Api.fetchPosts((newPage - 1) * 10, 10)
      .then(data => {
        this.setState(prevState => ({
          posts: data.data.posts,
          filteredPosts: data.data.posts,
          typeFilter: 'all',
          currentPage: newPage
        }))
      })
  }

  render() {
    const { typeFilter } = this.state
    return (
      <div className="container container--feed">
        <nav className="level">
          <div className="level-left">
            <div className="level-item">
              <p className="subtitle is-5">
                <strong>{this.state.totalPosts}</strong> posts
              </p>
            </div>
            <form onSubmit={this.search}>
              <div className="level-item">
                <div className="field has-addons">
                  <p className="control">
                    <input onChange={this.onChange} name="searchTxt" className="input" type="text" placeholder="Find a post" />
                  </p>
                  <p className="control">
                    <button className="button">
                      Search
                    </button>
                  </p>
                </div>
              </div>
            </form>
          </div>

          <div className="level-right">
            <p className="level-item"><a onClick={(e) => this.changeFilter(e, 'all')}>{ typeFilter === 'all' ? <strong>All posts</strong> : 'All posts' }</a></p>
            <p className="level-item">Looking for:</p>
            <p className="level-item"><a onClick={(e) => this.changeFilter(e, 'design')}>{ typeFilter === 'design' ? <strong>Design</strong> : 'Design' }</a></p>
            <p className="level-item"><a onClick={(e) => this.changeFilter(e, 'code')}>{ typeFilter === 'code' ? <strong>Code</strong> : 'Code' }</a></p>
            <p className="level-item"><a className="button is-success" onClick={this.togglePostForm}>Create Yours</a></p>
          </div>
        </nav>
        <div className="feed">
          { this.state.filteredPosts.length !== 0 && this.state.pages > 0
          && <Pagination pages={this.state.pages} currentPage={this.state.currentPage} changePage={this.changePage} /> }
          { this.state.showPostForm && <PostForm togglePostForm={this.togglePostForm} storePost={this.storePost} /> }
          { this.state.filteredPosts.map(post => {
            return <Post post={post} key={post.id} deletePost={this.deletePost} />
          }) }

          { this.state.filteredPosts.length > 0 || <p style={{textAlign: 'center'}}>It appears there are not posts</p> }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(Feed)
