const mongoose = require("mongoose");

const candidateProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: { type: String, required: true, default:"candidate"},
  address: String,
  phone: String,
  skills: [String],
  experience: [
    {
      jobTitle: String,
      company: String,
      startDate: Date,
      endDate: Date,
      description: String,
    },
  ],
  education: [
    {
      degree: String,
      school: String,
      graduationDate: Date,
    },
  ],
  coverLetter: String,
  resume: String, 
  jobApplications: [
    {
      job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
      status: String, 
      applicationDate: Date,
    },
  ],

});
const CandidateProfile =  mongoose.model("CandidateProfile", candidateProfileSchema);

module.exports =CandidateProfile;
