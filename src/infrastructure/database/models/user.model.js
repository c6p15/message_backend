const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  _id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
  username: { type: String, required: true, unique: true },
  firstname: String,
  lastname: String,
  password: { type: String, required: true }
}, { timestamps: true }, { collection: 'users' })

module.exports = mongoose.model('User', userSchema)