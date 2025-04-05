import multer from 'multer'
import path from 'path'
import crypto from 'crypto'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/images')
    },
    filename: function (req, file, cb) {
        const fn = crypto.randomBytes(10).toString("hex") + path.extname(file.originalname)
        cb(null, fn)
    }
})

export const upload = multer({ storage: storage })