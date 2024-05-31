export default class JobModel {
  constructor(
    id,
    jobCategory,
    jobDesignation,
    jobLocation,
    companyName,
    salary,
    applyBy,
    skillsRequired,
    numberOfOpenings,
    jobPostedOn,
    jobPostedBy
  ) {
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

  static add(
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
  ) {
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
    console.log(jobsList);
  }

  static getById(id) {

    return jobsList.find((job) => job.id == id);
  }

  static getJobList() {
    return jobsList;
  }

  static addApplicant(jobId, applicant) {
    const job = jobsList.find((j) => j.id == jobId);
    job.applicants.push(applicant);
  }

  static updateById(id, category, designation, location, company, salary, applyBy, skills, openings, jobPostedOn) {
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
      jobPostedOn
    );
    const index = jobsList.findIndex((job) => job.id == id);
    jobsList[index] = newJob;
  }

  static deleteById(id, userEmail) {
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
}

let jobsList = [
  new JobModel(
    1,
    "tech",
    "Frontend Developer",
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
    "non-tech",
    "Full stack Developer",
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
