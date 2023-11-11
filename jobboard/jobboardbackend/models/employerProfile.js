const mongoose = require("mongoose");

const employerProfileSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
    role: { type: String, required: true, default:"employer"},
  industry: String,
  location: String,
  contactNumber: String,
  companySize: String, 
  description: String,

  
});
const EmployerProfile= mongoose.model("EmployerProfile", employerProfileSchema);
module.exports =EmployerProfile
