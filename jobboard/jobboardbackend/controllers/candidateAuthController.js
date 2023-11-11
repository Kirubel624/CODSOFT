const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const CandidateProfile = require('../models/candidateProfile');
const authService=require('../controllers/authController');
const { default: mongoose } = require('mongoose');
// Create a new candidate profile with a single file upload for the resume
exports.register = async (req, res) => {
  try {
    const {
      name,
      username,
      email,
      address,
      password,
      phone,
      skills,
      experience,
      education,
      coverLetter,
    } = req.body;

    const arrSkills = skills.split(" ");
    const parsedExp = JSON.parse(experience);
    const parsedEdu = JSON.parse(education);

    const resume = req.file ? req.file.path : undefined;

    // Use Mongoose .create() to create a new CandidateProfile
    const savedProfile = await CandidateProfile.create({
      name,
      email,
      address,
      phone,
      skills: arrSkills,
      experience: parsedExp,
      education: parsedEdu,
      coverLetter,
      role: "candidate",
      resume: resume,
    });

    // Call the registerUser function from authService
    const userData = await authService.registerUser({
      username,
      email,
      password,
      role: "candidate",
      user: savedProfile._id,
    });

    res.status(201).json(savedProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to create candidate profile' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await CandidateProfile.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch users' });
  }
};
exports.getUserByID = async (req, res) => {
  try {
    console.log("in here")
    const userId = req.params.id;

    // Check if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const user = await CandidateProfile.findById(userId).populate({
      path:'jobApplications.job',
      model:'Job',
      populate: {
        path: 'company',
        model: 'EmployerProfile', // Adjust the model name as per your schema
      },
    }

    );

    // Check if the user with the specified ID exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch user' });
  }
};

// Update candidate profile
exports.updateCandidateProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    // Check if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    // Assuming that you are receiving the updated data in the request body
    const {
      name,
      address,
      phone,
      skills,
      experience,
      education,
      coverLetter,
      resume,
      jobApplications, // Assuming you want to update this field too
    } = req.body;

    const arrSkills = skills ? skills.split(" ") : undefined;
    const parsedExp = experience ? JSON.parse(experience) : undefined;
    const parsedEdu = education ? JSON.parse(education) : undefined;

    // Build the updated profile data with only provided fields
    const updatedProfileData = {
      ...(name && { name }),
      ...(address && { address }),
      ...(phone && { phone }),
      ...(arrSkills && { skills: arrSkills }),
      ...(parsedExp && { experience: parsedExp }),
      ...(parsedEdu && { education: parsedEdu }),
      ...(coverLetter && { coverLetter }),
      ...(resume && { resume }),
      ...(jobApplications && { jobApplications }),
    };

    // Use Mongoose .findByIdAndUpdate() to update the candidate profile
    const updatedProfile = await CandidateProfile.findByIdAndUpdate(
      userId,
      updatedProfileData,
      { new: true } // This option returns the updated document
    );

    // Check if the user with the specified ID exists
    if (!updatedProfile) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to update candidate profile' });
  }
};
