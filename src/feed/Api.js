class Api {
  static fetchPosts() {
    return fetch('/posts')
      .then(res => res.json())
      .catch(err => err)
  }

  static searchPosts(terms) {
    return fetch('/search?term=' + terms, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }})
      .then(res => res.json())
      .catch(err => err)
  }

  static storeComment(comment) {
    return fetch('/comment/create', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('user_token')}`
      },
      body: JSON.stringify(comment)
    })
      .then(res => res.json())
      .catch(err => err)
  }

  static deleteComment(id) {
    return fetch(`/comment/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('user_token')}`
      }
    })
      .then(res => res.json())
      .catch(err => err)
  }

  static storePost(post) {
    return fetch('/post/create', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('user_token')}`
      },
      body: JSON.stringify(post)
    })
      .then(res => res.json())
      .catch(err => err)
  }

  static deletePost(id) {
    return fetch(`/post/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('user_token')}`
      }
    })
      .then(res => res.json())
      .catch(err => err)
  }
}

export default Api
