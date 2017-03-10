import statusHelper from '../util/StatusHelper'

export default class Api {
  static update (data) {
    return fetch(`/user/${data.id}/profile`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(statusHelper)
    .then(res => res.json())
    .catch(err => err)
    .then(data => data)
  }
}
