const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const CandidateProfile = require('../models/candidateProfile');
const EmployerProfile = require('../models/employerProfile');



exports.registerUser = async ({ username, email, password, role,user }) => {
  try {
    const lowercaseEmail = email.toLowerCase();
console.log(user,"this should be id")
    // Check if the email is already registered
    const existingUserE = await User.findOne({ email: lowercaseEmail });
    const existingUserU = await User.findOne({ username: username });

    if (existingUserE || existingUserU) {
      throw new Error('Email already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ email: lowercaseEmail, password: hashedPassword, username, role, user });

    const data = {
      username: newUser.username,
      userID: newUser._id,
      email: newUser.email,
      user:newUser.user
    };

    await newUser.save();
    console.log("User registered successfully");

    return {
      userID: data.userID,
      username: data.username,
      message: 'User registered successfully',
    };
  } catch (error) {
    throw new Error('Internal server error');
  }
};


// Login an existing user
exports.login = async (req, res) => {
  //console.log("it has gotten inside here!!!!!")
  try {
    const { email, password } =req.body;
    const lowercaseEmail = email.toLowerCase(); // Convert email to lowercase
console.log(req.body)
//console.log(req.body)
    // Check if the email exists
    const user = await User.findOne({ email:lowercaseEmail });
    let profileID;

    console.log("it has gotten here")
    console.log(user._id)
    console.log(user.role)

    const id=user._id
    const role=user.role
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    if(role==="candidate"){
      const roleCompare=await CandidateProfile.findOne({email:lowercaseEmail})
      console.log(roleCompare.role,"this is the role which was found")
      console.log("inside candidate")
      profileID = await CandidateProfile.findOne({ _id: user.user });

      if(roleCompare.role!==role){
      console.log("condition of not being the same role detected")

        res.status(403).json({ error: 'Unauthorized' });
      }
    }else if(role==="employer"){
      const roleCompare=await EmployerProfile.findOne({email:lowercaseEmail})
      console.log("inside employer")
      profileID = await EmployerProfile.findOne({ _id: user.user });
      console.log(profileID,"profileID")
      if(roleCompare.role!==role){
      console.log("condition of not being the same role detected")

        return res.status(403).json({ error: 'Unauthorized' });
      }
    }
    console.log("it has gotten past the checker")
    // Compare the password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
    console.log("password not match")

      return res.status(401).json({ error: 'Invalid email or password' });
    }
    console.log("it has gotten past the passchecker")

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, '-secret-key', { expiresIn: '1h' });
    console.log("it has gotten past the token")

    res.status(200).json({ token, username: user.username, userID:profileID._id, role:user.role });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
