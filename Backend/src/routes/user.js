const express = require('express')
const UserController = require('../controller/UserController')
const { requireSignin } = require('../middleware')
const router = express.Router()
const path = require('path')
const shortid = require('shortid')
var multer = require('multer')
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename(req, file, cb) {
        cb(null,`${shortid.generate()}-${file.originalname}`)
    },
})
const upload = multer({ storage })

// tạo index và úp data
router.post(
    `/index`,requireSignin,upload.single('dataindex'),UserController.createIndexAndUpData
)
// add thêm data 
router.put(
    `/index`,requireSignin,upload.single('dataindex'),UserController.updateData
)
// get all data index
router.get(
    `/datas/:index`,UserController.searchDataIndex
)

// search kết hợp với các phép toán
router.post(
    `/searchadvanced/:index`,UserController.searchAdvanced
)

// search không cần nhập field
router.post(
    `/searchs/:index`,UserController.searchAllField
)
/// delete record 
router.delete(
    `/:index/:id`,UserController.deteleRecord
)
// delete nhiều record
router.post(
    `/:index/ids`,requireSignin,UserController.deleteRecords
)
// xoá index
router.delete(
    `/:index`,requireSignin,UserController.deleteIndex
)
// get all index
router.get(
    `/indexs`,requireSignin,UserController.getAllIndex
)
// chia các record theo scroll 
router.post(
    `/data/index/nextpage`,requireSignin,UserController.nextPage
)
module.exports = router