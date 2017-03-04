import db from '../config/db'
import { validateProfile } from '../util/validations'

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
      return this.body = {
        success: false,
        error: 'The profile submitted is not valid'
      }
    }

    const result = yield profiles.create(profile)
      .then(newProfile => {
        return {
          success: true,
          message: 'Successfully created new profile!',
          data: {
            profile
          }
        }
      })
      .catch(err => {
        return {
          success: false,
          message: 'An unexpected error has occurred!',
          error: err
        }
    })

    if (!result.success) this.status = 400
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
         return {
           success: false,
           error: 'Unable to find profile by ID'
         }
       } else {
         return {
           success: true,
           message: 'Successfully fetched profile!',
           data: {
             profile: profile
           }
         }
       }
     })
     .catch(err => {
       return {
         success: false,
         message: 'An unexpected error has occurred!',
         error: err
       }
     })

     if (!result.success) this.status = 400
     this.body = result
   }
}
