import { combineReducers } from 'redux'
import authReducer from '../views/auth/reducer'

const rootReducer = combineReducers({
  auth: authReducer
})

export default rootReducer
