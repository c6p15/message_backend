const path = require('path')
const fs = require('fs')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')

const uploadPath = path.join(__dirname, '../../uploads')

if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true })

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadPath),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    const filename = `${Date.now()}-${uuidv4()}${ext}`
    cb(null, filename)
  }
})

const upload = multer({ storage })

module.exports = {
  upload,       
  uploadPath
}