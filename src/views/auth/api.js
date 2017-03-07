const statusHelper = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

const api = {
  signup (data) {
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
  },
  login (data) {
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

export default api
