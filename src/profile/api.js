export default class Api {
  static update (data) {
    return fetch(`/api/v1/users/${data.user_id}/profile`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('user_token')}`
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .catch(err => err)
  }

  static fetchUser (id) {
    return fetch(`/api/v1/users/${id}`)
      .then(res => res.json())
      .catch(err => err)
  }

  static fetchUserPosts (id, params) {
    return fetch(`/api/v1/users/${id}/posts${params}`)
      .then(res => res.json())
      .catch(err => err)
  }
}
