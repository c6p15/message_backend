require('dotenv').config()
const base_url = process.env.BASE_URL

class MessageEntity {
  constructor({ _id, message, file, reply_to, from, to, createdAt, updatedAt }) {
    this.id = _id
    this.message = message
    this.file = file?.map(filename => `${base_url}/api/files/${filename}`) || []
    this.reply_to = reply_to
    this.from = from
    this.to = to
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}

module.exports = MessageEntity