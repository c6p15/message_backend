const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController.js')
const auth = require('../middlewares/authMiddleware.js')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/profile', auth, UserController.getProfile)

module.exports = router