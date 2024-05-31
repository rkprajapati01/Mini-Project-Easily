import express from "express";
import JobController from "../controllers/job.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();
const jobController = new JobController();

router.get("/", jobController.getJobListing);
router.get("/new", auth, jobController.getNewJobForm);
router.post("/new", auth, jobController.addNewJob);
router.get("/:id", jobController.getJobDetailsById);
router.get("/:id/applicants", auth, jobController.getApplicantsList);
router.get("/:id/update", auth, jobController.getUpdateForm);
router.post("/:id/update", auth, jobController.updateJobById);
router.post("/:id/delete", jobController.deleteJobById);

export default router;
