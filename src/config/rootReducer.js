import { combineReducers } from 'redux'
import authReducer from '../auth/reducer'
import flashMessageReducer from '../flashmessage/reducer'

const rootReducer = combineReducers({
  auth: authReducer,
  flashMessages: flashMessageReducer
})

export default rootReducer
