import User from '../models/User'

export default class UserController {
  static getUserById(req, res) {
    const id = req.params._id

    User.findOne({"_id": id}, (err, user) => {
      err ? console.log(err) : res.send(user)
    })
  }

  static updateUser(req, res) {
    const __user = req.body
    const id = user._id

    User.findByIdAndUpdate(id, __user, { new: true }, (err, user) => {
      err ? console.log(err) : res.send(user)
    })
  }

  static createUser(req, res) {
    const __user = req.body
    const isValid = validateUser(__user)

    if(isValid) {
      const newUser = User(__user)
      newUser.save(err => {
        if(err) {
          console.log(err)
          if(err.name === 'MongoError' && err.code === 11000) {
            return res.status(500).send({
              message: 'User alreay exists!'
            })
          }
          res.status(500).send(err)
        } else {
          res.send({
            message: 'User created!'
          })
        }
      })
    } else {
      res.status(400).json({
        message: 'Invalid User'
      })
    }
  }

  static getAllDevelopers(req, res) {
    User.find({"profession": "developer"}, (err, users) => {
      err ? res.status(500).json({ message: 'Unable to find any developers', err: err}) : res.send(users)
    })
  }

  static getAllDesigners(req, res) {
    User.find({"profession": "designer"}, (err, users) => {
      err ? res.status(500).json({ message: 'Unable to find any designers', err: err}) : res.send(users)
    })
  }
}