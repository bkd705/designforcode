import unfetch from 'unfetch'

if(!window.fetch) { const fetch = unfetch }

const statusHelper = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

const api = {
  signup(data) {
    return fetch('http://localhost:3000/user/create', {
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
  },
  login(data) {
    return fetch('http://localhost:3000/user/login', {
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

export default api