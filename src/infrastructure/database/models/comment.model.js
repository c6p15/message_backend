const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  _id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
  message: { type: String, required: true },
  file: { type: [String], default: [] },
  reply_to: { type: String, ref: 'Comment', default: null },
  from: { type: String, ref: 'User', required: true },
  to: { type: String, ref: 'User', required: true }
}, { timestamps: true },  { collection: 'comments' })

module.exports = mongoose.model('Comment', commentSchema)
