const express = require('express')
const router = express.Router()
const AuthController = require('../controller/AuthController')
const { validateSigninRequest, isRequestValidated } = require('../validator/auth')
router.post(
    '/signin',validateSigninRequest,isRequestValidated,AuthController.signin
)
router.post(
    `/signup`,validateSigninRequest,isRequestValidated,AuthController.signup
)
module.exports = router