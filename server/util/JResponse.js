'use strict'

export default class JResponse {
  static success(message, data = null) {
    let json = {
      success: true,
      message: message
    }

    if (data !== null) json.data = data
    return json
  }

  static failure(error, data = null) {
    let json = {
      success: false,
      error: error
    }

    if (data !== null) json.data = data
    return json
  }
}
