import express from 'express'
import {applyJob,getAppliedJobs,getApplicants,updatedStatus} from '../controllers/application.js'
import {isAuthenticated} from '../Middleware/isAuthenticated.js'
const router = express.Router()

router.route("/apply/:id").get(isAuthenticated,applyJob)
router.route("/get").get(isAuthenticated,getAppliedJobs)
router.route("/:id/applicants").get(isAuthenticated,getApplicants)
router.route("/status/:id/update").post(isAuthenticated,updatedStatus)

export default router
