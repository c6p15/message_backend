class MessageRepository {
    async createMessage(messageData) {
        throw new Error('Method not implemented')
    }
    
    async reply(messageData) {
        throw new Error('Method not implemented')
    }
    
    async getMessagesBetweenUsers(userId1, userId2) {
        throw new Error('Method not implemented')
    }

    async deleteMessage(messageId, userId) {
        throw new Error('Method not implemented')
    }
}

module.exports = MessageRepository