require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async registerUser(userData) {
    const existing = await this.userRepository.findByUsername(userData.username)
    if (existing) throw new Error('Username already exists')
    
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword

    return this.userRepository.create(userData)
  }

  async getUserById(id) {
    return this.userRepository.findById(id)
  }

  async login({ username, password }) {
    const user = await this.userRepository.findByUsernameWithPassword(username)
    if (!user) throw new Error('Invalid username or password')

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) throw new Error('Invalid username or password')

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' })
    return { user, token }
  }
}

module.exports = UserService