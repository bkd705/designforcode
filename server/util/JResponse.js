'use strict'

export default class JResponse {
  static success(message) {
    return {
      success: true,
      message: message
    }
  }

  static success(message, data) {
    return {
      success: true,
      message: message,
      data: data
    }
  }

  static failure(error) {
    return {
      success: false,
      error: error
    }
  }

  static failure(error, data) {
    return {
      success: false,
      error: error,
      data: data
    }
  }
}
