const express = require('express')
const router = express.Router()
const MessageController = require('../controllers/MessageContoller.js')
const { upload } = require('../../services/upload.service.js')
const auth = require('../middlewares/authMiddleware.js')

router.use(auth)

router.post('/', upload.array('files'), MessageController.createMessage)
router.post('/reply', upload.array('files'), MessageController.replyMessage)
router.get('/:userId', MessageController.getMessages)
router.delete('/:id', MessageController.deleteMessage)

module.exports = router