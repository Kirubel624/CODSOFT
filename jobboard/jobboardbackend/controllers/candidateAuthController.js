const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const CandidateProfile = require('../models/candidateProfile');
const authService=require('../controllers/authController');
const { default: mongoose } = require('mongoose');

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


    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const user = await CandidateProfile.findById(userId).populate({
      path:'jobApplications.job',
      model:'Job',
      populate: {
        path: 'company',
        model: 'EmployerProfile', 
      },
    }

    );


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


    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const {
      name,
      address,
      phone,
      skills,
      experience,
      education,
      coverLetter,
      resume,
      jobApplications, 
    } = req.body;

    const arrSkills = skills ? skills.split(" ") : undefined;
    const parsedExp = experience ? JSON.parse(experience) : undefined;
    const parsedEdu = education ? JSON.parse(education) : undefined;


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


    const updatedProfile = await CandidateProfile.findByIdAndUpdate(
      userId,
      updatedProfileData,
      { new: true } 
    );


    if (!updatedProfile) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to update candidate profile' });
  }
};
