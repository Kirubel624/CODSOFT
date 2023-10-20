const express=require('express')
const router=express.Router();
const userController= require('../controllers/userController')


//Register a new user
router.post('/register',userController)

//Login a new user
router.post('/login',userController)

//Fetch a specific user
router.get('/:id',userController)

//Fetch list of users
router.get('/',userController)


module.exports=router
