import statusHelper from '../util/StatusHelper'

export default class Api {
  static signup (data) {
    return fetch('/user/create', {
      method: 'POST',
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

  static login (data) {
    return fetch('/auth/login', {
      method: 'POST',
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
