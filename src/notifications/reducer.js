import { types } from './actions'
import shortid from 'shortid'
import findIndex from 'lodash/findIndex'

export default (state = [], action = {}) => {
  switch(action.type) {
  case types.ADD_NOTIFICATION:
    return [
      ...state,
      {
        id: shortid.generate(),
        type: action.message.type,
        text: action.message.text,
        link: action.message.link
      }
    ]
  case types.DELETE_NOTIFICATION:
    const index = findIndex(state, { id: action.id })
    if (index >= 0) {
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ]
    }
    return state
  default: return state
  }
}
