import JobModel from "../models/job.model.js";
import ApplicantModel from "../models/applicant.model.js";
import { sendNotification } from "../notifications/mail.notification.js";

export default class JobController {
  getJobListing(req, res) {
    const jobs = JobModel.getJobList();
    res.render("job-listing", { jobs: jobs, userEmail: req.session.userEmail });
  }

  getNewJobForm(req, res) {
    res.render("new-job", { userEmail: req.session.userEmail });
  }

  getUpdateForm(req, res) {
    const jobId = req.params.id;
    const fetchedJob = JobModel.getById(jobId);
    res.render("update-job", { job: fetchedJob, userEmail: req.session.userEmail });
  }

  addNewJob(req, res) {
    const {
      category,
      designation,
      location,
      company,
      salary,
      applyBy,
      skills,
      openings,
    } = req.body;

    JobModel.add(
      category,
      designation,
      location,
      company,
      salary,
      applyBy,
      skills,
      openings,
      new Date(),
      req.session.userEmail
    );
    res.redirect("/jobs");
  }

  getJobDetailsById(req, res) {
    const id = req.params.id;
    const fetchedJob = JobModel.getById(id);
    res.render("job-detail", { job: fetchedJob, userEmail: req.session.userEmail });
  }

  applyWithApplicant(req, res) {
    const jobId = req.params.id;
    const { name, email, contact } = req.body;
    const job = JobModel.getById(jobId);
    const resumeUrl = "/resumes/" + req.file.filename;
    const newApplicant = new ApplicantModel(job.applicants.length + 1, name, email, contact, resumeUrl);
    JobModel.addApplicant(jobId, newApplicant);
    sendNotification(newApplicant, job);
    res.redirect("/jobs");
  }

  getApplicantsList(req, res) {
    const jobId = req.params.id;
    const job = JobModel.getById(jobId);
    res.render("applicant-listing", { applicants: job.applicants, userEmail: req.session.userEmail });
  }

  updateJobById(req, res) {
    const jobId = req.params.id;
    const { category, designation, location, company, salary, applyBy, skills, openings, } = req.body;
    JobModel.updateById(jobId, category, designation, location, company, salary, applyBy, skills, openings, new Date());
    const updatedJob = JobModel.getById(jobId);
    res.redirect('/jobs');
  }

  deleteJobById(req, res) {
    const jobId = req.params.id;
    const userEmail = req.session.userEmail;
    const result = JobModel.deleteById(jobId, userEmail);
    console.log(result);
    if (result) {
      res.redirect('/jobs');
    } else {
      res.render("404", { errorMessage: "Register first to login ", userEmail: req.session.userEmail });
    }
  }
}
