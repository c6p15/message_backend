const UserEntity = require('../../domain/users/UserEntity.js')
const UserRepository = require('../../domain/users/UserRepository.js')
const UserModel = require('../database/models/user.model.js')

class UserRepositoryImpl extends UserRepository {
  async create(userData) {
    const user = await UserModel.create(userData)
    return new UserEntity(user)
  }

  async findById(id) {
    const user = await UserModel.findById(id)
    return user ? new UserEntity(user) : null
  }

  async findByUsername(username) {
    const user = await UserModel.findOne({ username })
    return user ? new UserEntity(user) : null
  }

  async findByUsernameWithPassword(username) {
    const user = await UserModel.findOne({ username }).select('+password')
    return user ? new UserEntity(user) : null
  }
}

module.exports = UserRepositoryImpl