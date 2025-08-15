require('dotenv').config()
const express = require('express')
const connectDB = require('../src/infrastructure/database/mongoose.js')

const app = express()
app.use(express.json())

const userRoutes = require('../src/interfaces/http/routes/user.routes.js')
// Routes
app.use('/api/users', userRoutes)

const PORT = 3003

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
})