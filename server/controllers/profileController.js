import db from '../config/db'
import { validateProfile } from '../util/validations'
import JRes from '../util/JResponse'

const profiles = db.profiles

export default class ProfileController {

  /**
   * Method for creating a new profile
   * @param next - The next state to transition to
   */
  static * create(next) {
    const profile = this.request.body
    const isValid = validateProfile(profile)

    if (!isValid) {
      this.status = 400
      return this.body = JRes.failure('The profile submitted is not valid')
    }

    const result = yield profiles.create(profile)
      .then(newProfile => {
        return JRes.success('Successfully created new profile!', { profile })
      })
      .catch(err => {
        return JRes.failure(err)
    })

    if (!result.success) {
      this.status = 400

      // Handle/Parser sequelize error
      if (result.error.name && result.error.name.indexOf('Sequelize') > -1) {
        result.error = result.error.errors[0].message
      }
    }

    this.body = result
  }

  /**
   * Method for finding a profile by ID
   * @param next - The next state to transition to
   */
   static * findOne(next) {
     const userId = this.params.id
     const result = yield profiles.findOne({
       user_id: userId
     })
     .then(profile => {
       if (profile == null) {
         return JRes.failure('Unable to find profile by ID')
       } else {
         return JRes.success('Successfully fetched profile!', { profile })
       }
     })
     .catch(err => {
       return JRes.success(err)
     })

     if (!result.success) {
       this.status = 400

       // Handle/Parser sequelize error
       if (result.error.name && result.error.name.indexOf('Sequelize') > -1) {
         result.error = result.error.errors[0].message
       }
     }

     this.body = result
   }
}
