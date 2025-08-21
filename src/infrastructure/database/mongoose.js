require('dotenv').config()
const mongoose = require('mongoose')

const mongodb_username = process.env.mongoDB_username
const mongodb_password = process.env.mongoDB_password
const mongodb_cluster = process.env.mongoDB_cluster
const database_name = process.env.mongoDB_database_name

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${mongodb_username}:${mongodb_password}@${mongodb_cluster}/${database_name}?retryWrites=true&w=majority&appName=Cluster0`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('✅ MongoDB connected')
  } catch (err) {
    console.error('❌ MongoDB connection error:', err)
    process.exit(1)
  }
}

module.exports = connectDB