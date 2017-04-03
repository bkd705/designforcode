const indicative = require('indicative')

module.exports = (bookshelf) => {
  bookshelf.Model.validate = async ({ rules, fields, required = [] }) => {
    if (!rules) return sendError('No rules provided')
    if (!fields) return sendError('No fields provided')
    if (!Array.isArray(required) && required !== 'all') return sendError('Required is in an invalid format')

    const newRules = rules
    const reqTxt = 'required|'

    for (let key of Object.keys(newRules)) {
      if (required === 'all') {
        newRules[key] = reqTxt + newRules[key]
      } else {
        if (required.indexOf(key) > -1) {
          newRules[key] = reqTxt + newRules[key]
        }
      }
    }

    return await indicative.validateAll(fields, newRules)
  }

  function sendError(error) {
    return {
      success: false,
      error: error
    }
  }
}
