const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const EmployerProfile = require('../models/employerProfile');
const authService =require('../controllers/authController')

// Register a new employer
exports.register = async (req, res) => {
  try {
    const{companyName,email, password,industry,location,contactNumber,companySize,description}=req.body
console.log(req.body)

     const savedProfile = await EmployerProfile.create({
      companyName,
      email,
      password,
      industry,
      location,
      role: "employer",
      contactNumber,
      companySize,
      description,
    });
 const userData=await authService.registerUser({
      username:companyName,
      password,
      email,
      role:"employer",
      user:savedProfile._id
    })
    res.status(201).json(savedProfile);
  } catch (error) {
    res.status(500).json({ error: 'Error creating employer profile' });
  }
};
exports.getEmployerProfiles = async (req, res) => {
  try {
    const profiles = await EmployerProfile.find();
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching employer profiles' });
  }
};

exports.getEmployerProfileById = async (req, res) => {
  const  id  = req.params.id;
  console.log('in employer profile get')

  try {
    const profile = await EmployerProfile.findById(id);
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching employer profile' });
  }
};
// Update employer profile
exports.updateEmployerProfile = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid employer profile ID' });
    }


    const {
      companyName,
      email,
      industry,
      location,
      contactNumber,
      companySize,
      description,
    } = req.body;


    const updatedProfileData = {
      ...(companyName && { companyName }),
      ...(email && { email }),
      ...(industry && { industry }),
      ...(location && { location }),
      ...(contactNumber && { contactNumber }),
      ...(companySize && { companySize }),
      ...(description && { description }),
    };


    const updatedProfile = await EmployerProfile.findByIdAndUpdate(
      id,
      updatedProfileData,
      { new: true } 
    );


    if (!updatedProfile) {
      return res.status(404).json({ error: 'Employer profile not found' });
    }

    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to update employer profile' });
  }
};

exports.deleteEmployerProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProfile = await EmployerProfile.findByIdAndRemove(id);
    if (!deletedProfile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.json(deletedProfile);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting employer profile' });
  }
};