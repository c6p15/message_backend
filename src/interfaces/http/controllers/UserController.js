const UserService = require('../../../application/users/UserService')
const UserRepositoryImpl = require('../../../infrastructure/repositories/UserRepositoryImpl')

const userRepository = new UserRepositoryImpl()
const userService = new UserService(userRepository)

exports.register = async (req, res) => {
  try {
    const user = await userService.registerUser(req.body)
    res.status(201).json({
      message: 'registration completed!!',
      status: 201,
      user: {
        id: user.id,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname
      }
    })
  } catch (err) {
    res.status(400).json({
      message: 'registration not complete',
      error: err.message
    })
  }
}

exports.getUser = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id)
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.status(200).json({
      message: 'fetch user completed',
      status: 200,
      user: {
        id: user.id,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname
      }
  })
  } catch (err) {
    res.status(500).json({
      message: 'fetch user not complete',
      error: err.message 
    })
  }
}

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body
    const result = await userService.login({ username, password })
    res.status(200).json({
      message: 'login completed!!', 
      status: 200,
      user : {
        id: result.user.id,
        username: result.user.username,
        firstname: result.user.firstname,
        lastname: result.user.lastname
      },
      token : result.token
    }) 
  } catch (err) {
    res.status(500).json({ message: 'login not complete', error: err.message })

  }
}