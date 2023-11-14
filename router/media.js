const express = require('express');
const router = express.Router();
const storage=require('../utils/multer')
const controller=require('../app/controller')
const multer=require('multer')()

router.use('/images',express.static('public/images'))
router.use('/files',express.static('public/files'))

router.post('/api/v1/upload', storage.image.single('image'), controller.media.uploadImage)
router.post('/api/v1/uploadVideo', storage.video.single('video'), controller.media.uploadVideo)
router.post('/api/v1/uploadFile', storage.file.single('file'), controller.media.uploadFile)
router.post('/api/v1/qrcode', controller.media.qrcode)
router.post('/api/v1/upload/imagekit',multer.single('image'),controller.media.imagekitUpload)

module.exports = router;