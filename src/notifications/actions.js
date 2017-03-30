const ADD_NOTIFICATION = 'ADD_NOTIFICATION'
const DELETE_NOTIFICATION = 'DELETE_NOTIFICATION'
const HIDE_NOTIFICATION_ALERT = 'HIDE_NOTIFICATION_ALERT'

export const types = {
  ADD_NOTIFICATION,
  DELETE_NOTIFICATION,
  HIDE_NOTIFICATION_ALERT
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

export function hideNotificationAlert(id) {
  return {
    type: HIDE_NOTIFICATION_ALERT,
    id
  }
}
