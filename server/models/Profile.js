import mongoose from 'mongoose'

const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const profileSchema = new Schema({
  userId: {
    type: ObjectId,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  profession: {
    type: String,
    required: true
  },
  skillLevel: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})