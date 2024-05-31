import express from "express";
import UserController from "../controllers/user.controller.js";
import JobController from "../controllers/job.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { getWelcome } from "../controllers/welcome.controller.js";
import jobRouter from "./job.router.js";
import { uploadFile } from "../middlewares/resume-upload.middleware.js";

const router = express.Router();
const userController = new UserController();
const jobController = new JobController();

router.use("/jobs", jobRouter);

router.get("/", getWelcome);
router.post("/register", userController.register);
router.get('/logout', userController.logout);
router.post("/login", userController.login);
router.post(
  "/apply/:id",
  uploadFile.single("resume"),
  jobController.applyWithApplicant
);

router.get("/404", (req, res) => {
  console.log('inside 404');
  res.render("404", { errorMessage: "Sorry!  Only Recruiters are permitted for this operation", userEmail: req.session.userEmail });
});



export default router;
