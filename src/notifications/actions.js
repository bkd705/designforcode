const ADD_NOTIFICATION = 'ADD_NOTIFICATION'
const DELETE_NOTIFICATION = 'DELETE_NOTIFICATION'
const HIDE_NOTIFICATION_ALERT = 'HIDE_NOTIFICATION_ALERT'
const CHANGE_ACTIVE_CHAT = 'CHANGE_ACTIVE_CHAT'

export const types = {
  ADD_NOTIFICATION,
  DELETE_NOTIFICATION,
  HIDE_NOTIFICATION_ALERT,
  CHANGE_ACTIVE_CHAT
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

export function changeActiveChat(activeChat) {
  if(!activeChat) {
    return {
      type: CHANGE_ACTIVE_CHAT,
      activeChat: {
        user: {
          username: '',
          email: '',
          id: ''
        }
      }
    }
  }

  return {
    type: CHANGE_ACTIVE_CHAT,
    activeChat
  }
}
