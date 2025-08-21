const MessageEntity = require("../../domain/messages/MessageEntity.js")
const MessageRepository = require("../../domain/messages/MessageRepository.js")
const MessageModel = require("../database/models/message.model.js")

class MessageRepositoryImpl extends MessageRepository {
  async createMessage(messageData) {
    const message = await MessageModel.create(messageData)
    return new MessageEntity(message.toObject())
  }

  async getMessagesBetweenUsers(userId1, userId2) {
    const messages = await MessageModel.find({
      $or: [
        { from: userId1, to: userId2 },
        { from: userId2, to: userId1 },
      ],
    })
      .sort({ createdAt: 1 })
      .lean()

    return messages.map((msg) => new MessageEntity(msg))
  }

  async replyToMessage({ message, files = [], from, to, reply_to }) {
    const parentMessage = await MessageModel.findById(reply_to)
    if (reply_to && !parentMessage) {
      throw new Error("Parent message not found")
    }

    const replyMessage = await MessageModel.create({
      message,
      file: files,
      from,
      to,
      reply_to: reply_to || null,
    })

    return new MessageEntity(replyMessage.toObject())
  }

  async findById(id) {
    const message = await MessageModel.findById(id)
    if (!message) return null
    return new MessageEntity(message.toObject())
  }

  async deleteMessage(messageId, userId) {
    const message = await MessageModel.findOne({
      _id: messageId,
      from: userId,
    })
    if (!message) return false
    await message.deleteOne()
    return true
  }
}

module.exports = MessageRepositoryImpl