const ADD_NOTIFICATION = 'ADD_NOTIFICATION'
const DELETE_NOTIFICATION = 'DELETE_NOTIFICATION'

export const types = {
  ADD_NOTIFICATION,
  DELETE_NOTIFICATION
}

export function addNotification(message) {
  return {
    type: ADD_NOTIFICATION,
    message
  }
}

export function deleteNotification(id) {
  return {
    type: DELETE_NOTIFICATION,
    id
  }
}
