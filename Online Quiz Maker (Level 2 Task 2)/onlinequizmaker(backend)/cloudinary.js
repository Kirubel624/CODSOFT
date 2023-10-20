const cloudinary =require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary'); 
const dotenv = require("dotenv");

dotenv.config({
    path: "./config.env",
  });

cloudinary.config({

    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    resource_type:"image",
})

const storage = new CloudinaryStorage({
    cloudinary,   
        folder:'CODSOFT_Internship', 
        allowedFormats: ['jpg', 'png', 'jpeg'],
       
})



module.exports = {cloudinary,storage};