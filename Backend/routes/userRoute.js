import express from 'express'
import {register,login,updateProfile,logout} from '../controllers/user.js'
import {isAuthenticated} from '../Middleware/isAuthenticated.js'
import {singleUpload} from '../Middleware/multer.js'
const router = express.Router()

router.route("/register").post(singleUpload,register)
router.route("/login").post(login)
router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile)
router.route("/logout").get(logout)

export default router

