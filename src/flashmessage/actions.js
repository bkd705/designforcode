const ADD_FLASH_MESSAGE = 'ADD_FLASH_MESSAGE'
const DELETE_FLASH_MESSAGE = 'DELETE_FLASH_MESSAGE'
const DELETE_ALL_MESSAGES = 'DELETE_ALL_MESSAGES'

export const types = {
  ADD_FLASH_MESSAGE,
  DELETE_FLASH_MESSAGE,
  DELETE_ALL_MESSAGES
}

export function addFlashMessage(message) {
  return {
    type: ADD_FLASH_MESSAGE,
    message
  }
}

export function deleteFlashMessage(id) {
  return {
    type: DELETE_FLASH_MESSAGE,
    id
  }
}

export function deleteAllMessages() {
  return {
    type: DELETE_ALL_MESSAGES
  }
}
