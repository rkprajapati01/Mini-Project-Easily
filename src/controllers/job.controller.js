// Necessary imports here

import JobModel from "../models/job.model.js";
import ApplicantModel from "../models/applicant.model.js";
import { sendNotification } from "../notifications/mail.notification.js";
// Job Controller class
export default class JobController {
  // Function to render all jobs from the jobslist
  getJobListing(req, res) {
    const jobs = JobModel.getAll();
    res.render("job-listing", { jobs: jobs, userEmail: req.session.userEmail });
  }
  // Function to render new job form to the client getRequest
  getNewJobForm(req, res) {
    res.render("new-job", { userEmail: req.session.userEmail });
  }
  // Function to render update job form to the client getRequest
  getUpdateForm(req, res) {
    const jobId = req.params.id;
    const fetchedJob = JobModel.getById(jobId);
    res.render("update-job", { job: fetchedJob, userEmail: req.session.userEmail });
  }
  // Handler to handle Post request for adding a new job
  addNewJob(req, res) {
    const { category, designation, location, company, salary, applyBy, skills, openings, } = req.body;

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

    // After adding the new job, redirecting to the all jobs page
    res.redirect("/jobs");
  }
  // Function to handle the get request for specific job detail page
  getJobDetailsById(req, res) {
    const id = req.params.id;
    const fetchedJob = JobModel.getById(id);
    res.render("job-detail", { job: fetchedJob, userEmail: req.session.userEmail });
  }
  // Function to handle post Apply request 
  applyWithApplicant(req, res) {
    const jobId = req.params.id;
    const { name, email, contact } = req.body;
    const job = JobModel.getById(jobId);  // fetching job by its id from job model
    const resumeUrl = "/resumes/" + req.file.filename; // generating resume url for applicant
    const newApplicant = new ApplicantModel(job.applicants.length + 1, name, email, contact, resumeUrl); // creating new applicant obj
    JobModel.addApplicant(jobId, newApplicant); // adding new applicant to the specified job
    sendNotification(newApplicant, job); // calling function to send confirmation email to the applicant
    res.redirect("/jobs"); // again to all jobs page
  }
  // Handler to get request to view all applicants for a specific job
  getApplicantsList(req, res) {
    const jobId = req.params.id;
    const allApplicants = JobModel.getApplicants(jobId);
    res.render("applicant-listing", { applicants: allApplicants, userEmail: req.session.userEmail });
  }

  updateJobById(req, res) {
    const jobId = req.params.id;
    const { category, designation, location, company, salary, applyBy, skills, openings, } = req.body;
    JobModel.updateById(jobId, category, designation, location, company, salary, applyBy, skills, openings, new Date(), req.session.userEmail);
    const updatedJob = JobModel.getById(jobId);
    res.redirect('/jobs');
  }

  deleteJobById(req, res) {
    const jobId = req.params.id;
    const userEmail = req.session.userEmail;
    const result = JobModel.deleteById(jobId, userEmail);
    if (result) {
      res.redirect('/jobs');
    } else {
      res.redirect("/404");
    }
  }

  searchJob(req, res) {
    const designation = req.params.text.toLowerCase();
    const foundJobList = JobModel.searchJob(designation);
    res.send(foundJobList);
  }
}
