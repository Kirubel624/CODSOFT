const express=require('express')
const router=express.Router()

const jobController=require('../controllers/jobController')
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
router.post('/:id', jobController.createJob)
router.get('/:id',jobController.getJobByID)
router.get('/',jobController.getAllJobs)
router.get('/employer/postedjobs/:id',jobController.getAllPostedJobs)
router.delete('/:id',jobController.deleteJob)
router.post('/',upload.single('resume'),jobController.applyForJob)
router.patch('/',jobController.updateApplicationStatus)

module.exports=router