
// Job Model class
export default class JobModel {
  constructor(id, jobCategory, jobDesignation, jobLocation, companyName, salary, applyBy, skillsRequired, numberOfOpenings, jobPostedOn, jobPostedBy) {
    this.id = id;
    this.jobCategory = jobCategory;
    this.jobDesignation = jobDesignation;
    this.jobLocation = jobLocation;
    this.companyName = companyName;
    this.salary = salary;
    this.applyBy = applyBy;
    this.skillsRequired = skillsRequired;
    this.numberOfOpenings = numberOfOpenings;
    this.jobPostedOn = jobPostedOn;
    this.jobPostedBy = jobPostedBy;
    this.applicants = [];
  }
  // Method to create a new job and add it to the jobs list array
  static add(category, designation, location, company, salary, applyBy, skills, openings, jobPostedOn, jobPostedBy) {
    const newJob = new JobModel(
      jobsList.length + 1,
      category,
      designation,
      location,
      company,
      salary,
      applyBy,
      skills,
      openings,
      jobPostedOn,
      jobPostedBy
    );
    jobsList.push(newJob);
  }
  // Method to get the specific job by its id
  static getById(id) {
    return jobsList.find((job) => job.id == id);
  }
  // Mehod to get the all jobs from joblist array
  static getAll() {
    return jobsList;
  }
  // method to add a new applicant to job applicants list
  static addApplicant(jobId, applicant) {
    const job = jobsList.find((j) => j.id == jobId);
    job.applicants.push(applicant);
  }
  // method to update a specific job by its id
  static updateById(id, category, designation, location, company, salary, applyBy, skills, openings, jobPostedOn, jobPostedBy) {
    const newJob = new JobModel(
      id,
      category,
      designation,
      location,
      company,
      salary,
      applyBy,
      skills,
      openings,
      jobPostedOn,
      jobPostedBy
    );
    const index = jobsList.findIndex((job) => job.id == id);
    jobsList[index] = newJob;
    console.log(jobsList);
  }
  // Mehod to delete a specific job by its id
  static deleteById(id, userEmail) {
    console.log(jobsList);
    const index = jobsList.findIndex(job => job.id == id);
    if (index != -1 && jobsList[index].jobPostedBy == userEmail) {
      jobsList.splice(index, 1);
      for (let i = 0; i < jobsList.length; i++) {
        jobsList[i].id = i + 1;
      }
      return true;
    } else {
      return false;
    }
  }

  // Method to get all the applicants for a specific job
  static getApplicants(id) {
    const index = jobsList.findIndex(job => job.id == id);
    return jobsList[index].applicants
  }

  static searchJob(designation) {
    return jobsList.filter((job) => job.jobDesignation.toLowerCase() == designation);
  }
}


// Jobs list array to store all jobs
let jobsList = [
  new JobModel(
    1,
    "tech",
    "Front End Developer",
    "Mumbai",
    "Google",
    "5000000",
    "01-01-2025",
    ["html", "css", "js"],
    2,
    "24-05-2024",
    'dheeraj@gmail.com'
  ),
  new JobModel(
    2,
    "non tech",
    "Intern",
    "Mumbai",
    "Google",
    "5000000",
    "01-01-2025",
    ["html", "css", "js"],
    2,
    "24-05-2024",
    'dheeraj@gmail.com'
  ),
  new JobModel(
    3,
    "non-tech",
    "intern",
    "Delhi",
    "Coding Ninjas",
    "50 LPA",
    "01-01-2025",
    ["html", "bootstrap", "js"],
    2,
    "24-05-2024",
    'rk22836@gmail.com'
  ),
];
