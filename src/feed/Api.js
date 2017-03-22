class Api {
  static fetchPosts() {
    return fetch('/posts')
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
}

export default Api