import express from "express";
import UserController from "../controllers/user.controller.js";
import JobController from "../controllers/job.controller.js";
import { getWelcome } from "../controllers/welcome.controller.js";
import jobRouter from "./job.router.js";
import { uploadFile } from "../middlewares/resume-upload.middleware.js";

const router = express.Router();
const userController = new UserController();
const jobController = new JobController();

// router for /jobs routes
router.use("/jobs", jobRouter);
// inital welcome page router
router.get("/", getWelcome);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get('/logout', userController.logout);
// router for apply functionality
router.post("/apply/:id", uploadFile.single("resume"), jobController.applyWithApplicant);

// common error page route
router.get("/404", (req, res) => {
  res.render("404", { errorMessage: "Sorry!  Only Recruiters are permitted for this operation", userEmail: req.session.userEmail });
});

export default router;
