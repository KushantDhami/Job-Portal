import express from 'express'
import {postJob,getAllJobs,getJobsById,getAdminJobs} from '../controllers/job.js'
import {isAuthenticated} from '../Middleware/isAuthenticated.js'
const router = express.Router()

router.route("/post").post(isAuthenticated,postJob)
router.route("/get").get(getAllJobs)
router.route("/getadminjobs").get(isAuthenticated,getAdminJobs)
router.route("/get/:id").get(isAuthenticated,getJobsById)

export default router