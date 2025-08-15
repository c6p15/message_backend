require('dotenv').config()
const express = require('express')
const path = require('path')
const http = require('http')
const { Server } = require('socket.io')
const connectDB = require('../src/infrastructure/database/mongoose.js')
const cookieParser = require('cookie-parser')

const app = express()
app.use(cookieParser())
app.use(express.json())

const server = http.createServer(app)
const io = new Server(server, {
  cors: { origin: '*', credentials: true }
})

app.use((req, res, next) => {
  req.io = io
  next()
})

io.on('connection', socket => {
  console.log('User connected:', socket.id)

  socket.on('join', userId => {
    socket.join(userId)
    console.log(`User ${userId} joined room ${userId}`)
  })

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
  })
})

const userRoutes = require('../src/interfaces/http/routes/user.routes.js')
const messageRoutes = require('../src/interfaces/http/routes/message.routes.js')
const { uploadPath } = require('./interfaces/services/upload.service.js')

app.use('/api/users', userRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/files', express.static(uploadPath))

const PORT = 3003

connectDB().then(() => {
  server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
})