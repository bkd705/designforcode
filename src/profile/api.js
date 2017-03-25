export default class Api {
  static update (data) {
    return fetch(`/user/${data.user_id}/profile`, {
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
    return fetch(`/user/${id}`)
      .then(res => res.json())
      .catch(err => err)
  }
}
