import express from "express";
import JobController from "../controllers/job.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();
const jobController = new JobController();

router.get("/", jobController.getJobListing);  // to get the all jobs page
router.get("/new", auth, jobController.getNewJobForm); // render a new job form page
router.post("/new", auth, jobController.addNewJob); // handles post request for new job
router.get("/:id", jobController.getJobDetailsById); // render job detail page to client
router.get("/:id/applicants", auth, jobController.getApplicantsList);  // to render the applicant list page for a specific job
router.get("/:id/update", auth, jobController.getUpdateForm); // render the update form to the user
router.post("/:id/update", auth, jobController.updateJobById); // handling post request for update job
router.post("/:id/delete", auth, jobController.deleteJobById); // handling post request for delete job
router.get('/search/:text', jobController.searchJob); // handling search functionality

export default router;
