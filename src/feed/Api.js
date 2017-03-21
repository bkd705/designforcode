class Api {
  static fetchPosts() {
    return fetch('/posts')
      .then(res => res.json())
      .catch(err => err)
  }
}

export default Api