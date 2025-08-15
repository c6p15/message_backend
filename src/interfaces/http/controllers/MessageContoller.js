const path = require("path")
const fs = require("fs")
const { uploadPath } = require("../../services/upload.service.js")

const MessageService = require("../../../application/messages/MessageService.js")
const MessageRepositoryImpl = require("../../../infrastructure/repositories/MessageRepositoryImpl.js")

const messageRepository = new MessageRepositoryImpl()

exports.createMessage = async (req, res) => {
  try {
    const messageService = new MessageService(messageRepository, req.io)
    const { message, to } = req.body
    const from = req.user.id
    const files = req.files?.map((f) => f.filename) || []

    const newMessage = await messageService.createMessage({
      message,
      from,
      to,
      files,
    })

    res.status(201).json({ message: "Message sent", data: newMessage })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.replyMessage = async (req, res) => {
  try {
    const messageService = new MessageService(messageRepository, req.io)
    const { message, reply_to, to } = req.body
    const from = req.user.id
    const files = req.files?.map((f) => f.filename) || []

    if (!reply_to)
      return res.status(400).json({ error: "reply_to is required" })

    const reply = await messageService.replyMessage({
      message,
      reply_to,
      from,
      to,
      files,
    })

    res.status(201).json({ message: "Reply sent", data: reply })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.getMessages = async (req, res) => {
  try {
    const messageService = new MessageService(messageRepository, req.io)
    const { userId } = req.params
    const currentUserId = req.user.id

    const messages = await messageService.getMessagesBetweenUsers(
      currentUserId,
      userId
    )

    res.status(200).json({ message: "Fetch messages completed", messages })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.deleteMessage = async (req, res) => {
  try {
    const messageService = new MessageService(messageRepository, req.io)
    const { id } = req.params
    const userId = req.user.id

    const message = await messageRepository.findById(id)
    if (!message || message.from !== userId)
      return res
        .status(404)
        .json({ error: "Message not found or unauthorized" })

    if (Array.isArray(message.file) && message.file.length) {
      message.file.forEach((fileUrl) => {
        const filename = fileUrl.split("/").pop()
        const filePath = path.join(uploadPath, filename)

        try {
          if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
        } catch (err) {
          console.error(`Failed to delete file ${filePath}:`, err.message)
        }
      })
    }

    const success = await messageService.deleteMessage(id, userId)
    if (!success)
      return res
        .status(404)
        .json({ error: "Message not found or unauthorized" })

    res.status(200).json({ message: "Message deleted" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.getFile = (req, res) => {
  const filename = req.params.fileName
  const filePath = path.join(uploadPath, filename)

  if (!fs.existsSync(filePath))
    return res.status(404).json({ error: "File not found" })
  res.sendFile(filePath)
}
