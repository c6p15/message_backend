const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  _id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
  message: { type: String},
  file: { type: [String], default: [] },
  reply_to: { type: String, ref: 'Message', default: null },
  from: { type: String, ref: 'User', required: true },
  to: { type: String, ref: 'User', required: true }
}, { timestamps: true },  { collection: 'messages' })

module.exports = mongoose.model('Message', messageSchema)