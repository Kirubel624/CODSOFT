const mongoose = require('mongoose');
const Job = require('../models/jobModel');
const CandidateProfile = require('../models/candidateProfile');
const nodemailer = require('nodemailer');

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 587,
  secure: false,
  auth: {
    user: 'no-reply@tsinue.com',
    pass: 'vvN8$nuw'
  }
});
exports.createJob = async (req, res) => {
  // Validate and convert companyID to ObjectId
  const isValidCompanyID = mongoose.Types.ObjectId.isValid(req.params.id);

  console.log(req.body, "it's at least here");

  if (isValidCompanyID) {
    try {
      const {
        title,
        description,
        location,
        employmentType,
        salary,
        experienceLevel,
        skillsRequired,
        applicationDeadline,
        jobType,
        benefits,
        responsibilities,
        qualifications,
      } = req.body;

      console.log('Before creating Job instance');
      console.log(req.params.id);

      const job = new Job({
        title,
        description,
        company: req.params.id, // Use the companyID directly
        location,
        employmentType,
        salary,
        experienceLevel,
        skillsRequired,
        applicationDeadline,
        jobType,
        benefits,
        responsibilities,
        qualifications,
      });

      console.log('After creating Job instance');
      const savedJob = await job.save();
      console.log('After saving Job instance');
      res.status(201).json({status:201});
    } catch (error) {
      console.error('Error creating job:', error);
      res.status(500).json({ error: 'Unable to create the job listing.' });
    }
  } else {
    // Handle the case where companyID is not valid
    res.status(400).json({ error: 'Invalid companyID' });
  }
};


// Get a specific job listing by ID
exports.getJobByID = async (req, res) => {
  console.log('in get job by id')
  try {
    const job = await Job.findById(req.params.id).populate({
      path: 'company',
      model: 'EmployerProfile',
      select: 'companyName', // Populate only the companyName field
     
    }).populate({
      path: 'applications.candidate',
      model: 'CandidateProfile',
    });
  console.log('after getting job')

    if (!job) {
  console.log('job no found')

      return res.status(404).json({ error: 'Job not found' });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch the job listing' });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    console.log("in all jobs fetch**************************************************")
    const jobs = await Job.find().populate({
      path: 'company',
      model: 'EmployerProfile',
      select: 'companyName', // Populate only the companyName field      
    });
    console.log(jobs)
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch job listings' });
  }
};

// Get all job listings for the authenticated employer
exports.getAllPostedJobs = async (req, res) => {
  console.log('Get all job listings&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')
  try {
    // Assuming the employer ID is available in the request object
    const employerId = req.params.id; // Adjust this based on your authentication setup

    const jobs = await Job.find({ company: employerId }).populate({
      path: 'company',
      model: 'EmployerProfile',
      select: 'companyName', // Populate only the companyName field
    });

    console.log(jobs);
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch job listings' });
  }
};

// Delete a job listing by ID
exports.deleteJob = async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndRemove(req.params.id);
    if (!deletedJob) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.status(204).send(); // 204 No Content upon successful deletion
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete the job listing' });
  }
};
// Apply for a job
exports.applyForJob = async (req, res) => {
  try {
    const { jobId, candidateId, status, applicationDate, coverLetter } = req.body;

    // Find the job by ID
    const job = await Job.findById(jobId);

    // Check if the job exists
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Check if the candidate has already applied for this job
    const existingApplication = job.applications.find(
      (app) => app.candidate.toString() === candidateId
    );

    if (existingApplication) {
      return res.status(400).json({ error: 'Candidate has already applied for this job' });
    }
// Fetch candidate details based on candidateId
const candidate = await Candidate.findById(candidateId);

if (!candidate) {
  return res.status(404).json({ error: 'Candidate not found' });
}

const { email: candidateEmail, name: candidateName } = candidate;

    const resume = req.file ? req.file.path : undefined;

    // Update the job's applications array
    job.applications.push({
      candidate: candidateId,
      applicationStatus: status,
      applicationDate: applicationDate,
      resume: resume,
      coverLetter: coverLetter,
    });

    // Save the updated job
    const updatedJob = await job.save();

    // Update the candidate profile with the applied job information
    const candidateProfile = await CandidateProfile.findOneAndUpdate(
      { _id: candidateId },
      {
        $push: {
          jobApplications: {
            job: jobId,
            status: status,
            applicationDate: applicationDate,
          },
        },
      },
      { new: true }
    );
// Send auto-response email
const mailOptions = {
  from: `"Support" <no-reply@tsinue.com>`,
  to: candidateEmail, // Use the candidate's email address
  subject: 'Job Application Received',
  text: `Dear ${candidateName},\n\nThank you for applying to our job (${job.title}). Your application has been received, and we will review it shortly.\n\nBest regards,\nThe Hiring Team`,
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Error sending auto-response email:', error);
  } else {
    console.log('Auto-response email sent:', info.response);
  }
});
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Error sending auto-response email:', error);
  } else {
    console.log('Auto-response email sent:', info.response);
  }
});
    res.status(200).json({ updatedJob, candidateProfile,status:200 });
  } catch (error) {
    res.status(500).json({ error: 'Unable to submit the job application' });
  }
};
// Update the status of a candidate's job application
exports.updateApplicationStatus = async (req, res) => {
  console.log('inside update status')
  try {
    const { userId, jobId, status } = req.body;
console.log(req.body,"sent from front end")
if (!mongoose.Types.ObjectId.isValid(userId)) {
  return res.status(400).json({ error: 'Invalid user ID' });
}

    // Find the candidate profile by ID
    const candidateProfile = await CandidateProfile.findById(userId);
    console.log(req.body,"aftyer finding candadate")

    // Check if the candidate profile exists
    if (!candidateProfile) {
    console.log(req.body,"no candadate found")

      return res.status(404).json({ error: 'Candidate profile not found' });
    }

    // Find the index of the job application in the candidate's jobApplications array
    const applicationIndex = candidateProfile.jobApplications.findIndex(
      (app) => app.job.equals(jobId)
    );
    console.log(req.body,"after finding applicaiton index")

    // Check if the job application exists
    if (applicationIndex === -1) {
      return res.status(404).json({ error: 'Job application not found' });
    }

    // Update the status of the job application
    candidateProfile.jobApplications[applicationIndex].status = status;

    // Save the updated candidate profile
    const updatedProfile = await candidateProfile.save();

    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to update application status' });
  }
};