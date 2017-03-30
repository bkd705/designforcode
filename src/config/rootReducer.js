import { combineReducers } from 'redux'
import authReducer from '../auth/reducer'
import notificationReducer from '../notifications/reducer'

const rootReducer = combineReducers({
  auth: authReducer,
  notifications: notificationReducer
})

export default rootReducer
