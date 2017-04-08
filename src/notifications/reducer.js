import { types } from './actions'
import shortid from 'shortid'
import findIndex from 'lodash/findIndex'

const initialState = {
  alerts: [],
  notifications: [],
  activeChat: ''
}

export default (state = initialState, action = {}) => {
  switch(action.type) {
  case types.CHANGE_ACTIVE_CHAT:
    return {
      ...state,
      activeChat: action.activeChat
    }
  case types.ADD_NOTIFICATION:
    const notification = {
      id: shortid.generate(),
      type: action.message.type,
      text: action.message.text,
      link: action.message.link
    }

    return {
      ...state,
      notifications: [
        ...state.notifications,
        notification
      ],
      alerts: [
        ...state.alerts,
        notification
      ]
    }
  case types.DELETE_NOTIFICATION:
    const notificationIndex = findIndex(state.notifications, { id: action.id  })
    if(notificationIndex >= 0) {
      return {
        ...state,
        alerts: [
          ...state.notifications.slice(0, notificationIndex),
          ...state.notifications.slice(notificationIndex + 1)
        ]
      }
    }
    return state
  case types.HIDE_NOTIFICATION_ALERT:
    const alertIndex = findIndex(state.alerts, { id: action.id })
    if (alertIndex >= 0) {
      return {
        ...state,
        alerts: [
          ...state.alerts.slice(0, alertIndex),
          ...state.alerts.slice(alertIndex + 1)
        ]
      }
    }
    return state
  default: return state
  }
}
