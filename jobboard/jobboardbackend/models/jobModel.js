const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EmployerProfile",
  },
  location: String,
  employmentType: String,
  salary: Number,
  experienceLevel: String,
  skillsRequired: [String],
  applicationDeadline: String,
  jobType: String,
  benefits: [String],
  responsibilities: [String],
  qualifications: [String],
  publishedDate: {
    type: Date,
    default: Date.now,
  },
  // New field to track job applications
  applications: [
    {
      candidate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CandidateProfile",
      },
      applicationStatus: String, // e.g., "applied", "under review", "interviewing", "rejected", "hired"
      applicationDate: String,
      coverLetter: String,
      resume: String
    },
  ],
});
const Job= mongoose.model("Job", jobSchema);
module.exports = Job
