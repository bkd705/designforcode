import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  dateJoined: {
    type: Date,
    required: true,
    default: Date.now()
  }
})

const User = mongoose.model('userSchema', userSchema)

export default User