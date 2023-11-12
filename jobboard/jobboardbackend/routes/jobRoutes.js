const express=require('express')
const router=express.Router()

const jobController=require('../controllers/jobController')
const multer = require('multer');
const { storage } = require("../cloudinary");


const multerFilter = (req, file, cb) => {

 const allowedExtensions = ['.docx', '.pdf', '.txt'];


 const fileExtension = file.originalname.split('.').pop().toLowerCase();

 if (allowedExtensions.includes(`.${fileExtension}`)) {
   cb(null, true);
 } else {
   cb(new Error('Please upload a valid document file (e.g., .docx, .pdf, .txt)'), false);
 }
};

const upload = multer({
  storage: storage,
  fileFilter: multerFilter,
  limits: {
    fileSize: 1024 * 1024 * 5 
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