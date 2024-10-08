import express from 'express'
import {registerCompany,getCompany,getCompanyById,updateCompany} from '../controllers/company.js'
import {isAuthenticated} from '../Middleware/isAuthenticated.js'
import {singleUpload} from '../Middleware/multer.js'
const router = express.Router()

router.route("/register").post(isAuthenticated,registerCompany)
router.route("/get").get(isAuthenticated,getCompany)
router.route("/get/:id").get(isAuthenticated,getCompanyById)
router.route("/update/:id").put(isAuthenticated,singleUpload,updateCompany)

export default router

