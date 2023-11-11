const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require("../cloudinary");

// Define multer filter
const multerFilter = (req, file, cb) => {
 // Define an array of allowed document file extensions
 const allowedExtensions = ['.docx', '.pdf', '.txt'];

 // Check the file extension
 const fileExtension = file.originalname.split('.').pop().toLowerCase();

 if (allowedExtensions.includes(`.${fileExtension}`)) {
   cb(null, true);
 } else {
   cb(new Error('Please upload a valid document file (e.g., .docx, .pdf, .txt)'), false);
 }
};

// Set up multer upload
const upload = multer({
  storage: storage,
  fileFilter: multerFilter,
  limits: {
    fileSize: 1024 * 1024 * 5 // 5 MB file size limit
  }
});
const candidateAuthController = require('../controllers/candidateAuthController');
const employerAuthController = require('../controllers/employerAuthController');
const authController = require('../controllers/authController');

// Candidate routes
router.post('/candidate/register',upload.single('resume'),candidateAuthController.register);
router.get('/candidate/:id',candidateAuthController.getUserByID);

// Employer routes
router.post('/employer/register', employerAuthController.register);
router.get('/employer/:id', employerAuthController.getEmployerProfileById);

//Candidate and Employer Login
router.post('/login', authController.login);


module.exports = router;