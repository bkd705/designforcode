import Profile from '../models/Profile'
import { validateProfile } from '../util/validations'

export default class ProfileController {
  static getProfileByUserId(req, res) {
    const userId = req.params.id

    Profile.findOne({"userId": userId}, (err, profile) => {
      err ? res.status(400).json({ message: 'Unable to find profile', err: err }) : res.send(profile)
    })
  }

  static getProfileById(req, res) {
    const id = req.params.id

    Profile.findOne({"_id": id}, (err, profile) => {
      err ? res.status(400).json({ message: 'Unable to find profile', err: err }) : res.send(profile)
    })
  }

  static createProfile(req, res) {
    const __profile = req.body
    const isValid = validateProfile(__profile)

    if(isValid) {
      const newProfile = Profile(__profile)
      newProfile.save(err => {
        if(err) {
          console.log(err)
          if(err.name === 'MongoError' && err.code === 11000) {
            return res.status(500).send({
              message: 'Profile alreay exists!'
            })
          }
          res.status(500).send(err)
        } else {
          res.send({
            message: 'Profile created!'
          })
        }
      })
    } else {
      res.status(400).json({
        message: 'Invalid Profile'
      })
    }
  }

  static updateProfile(req, res) {
    const __profile = req.body
    const id = __profile._id

    Profile.findByIdAndUpdate(id, __profile, { new: true}, (err, profile) => {
      err ? res.status(500).json({ message: 'Unable to update profile', err: err}) : res.send(profile)
    })
  }
}