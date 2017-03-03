import db from '../config/db'
import { validateProfile } from '../util/validations'

const profiles = db.profiles

/**
 * Method for creating a new profile
 * @param req the request paramater passed from express
 * @param res the response parameter passed from express
 */
export function createProfile(req, res) {
  const profile = req.body
  const isValid = validateProfile(profile)

  if(isValid) {
    profiles.create(profile)
    .then(newProfile => {
      res.send({
        profile,
        status: 'success',
        message: 'New profile created successfully!'
      })
    })
    .catch(err => {
      res.status(500).json({
        err: err,
        message: 'An unexpected error occurred!'
      })
    })
  } else {
    res.status(400).json({
      err: 'Not a valid profile',
      message: 'The profile submitted is not valid'
    })
  }
}

export function findOneProfile(req, res) {
  const userId = req.params.id

  profiles.findOne({
    user_id: userId
  })
  .then(profile => {
    res.send({ profile })
  })
  .catch(err => {
    res.status(500).json({
      err: err,
      message: 'An unexpected error has occurred!'
    })
  })
}