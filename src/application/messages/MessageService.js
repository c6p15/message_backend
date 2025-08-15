class MessageService {
  constructor(messageRepository, io) {
    this.messageRepository = messageRepository
    this.io = io
  }

  async createMessage({ message, reply_to = null, from, to, files = [] }) {
    const newMessage = await this.messageRepository.createMessage({ message, reply_to, from, to, file: files })

    this.io.to(to).emit('newMessage', newMessage)
    this.io.to(from).emit('newMessage', newMessage)

    return newMessage
  }

  async replyMessage({ message, reply_to, from, to, files = [] }) {
    if (!reply_to) throw new Error("reply_to is required")

    const reply = await this.messageRepository.replyToMessage({ message, reply_to, from, to, files })

    this.io.to(to).emit('newMessage', reply)
    this.io.to(from).emit('newMessage', reply)

    return reply
  }

  async getMessagesBetweenUsers(currentUserId, userId) {
    return await this.messageRepository.getMessagesBetweenUsers(currentUserId, userId)
  }

  async deleteMessage(id, userId) {
    const success = await this.messageRepository.deleteMessage(id, userId)

    if (success) {
      this.io.to(userId).emit('messageDeleted', id)
    }

    return success
  }
}

module.exports = MessageService