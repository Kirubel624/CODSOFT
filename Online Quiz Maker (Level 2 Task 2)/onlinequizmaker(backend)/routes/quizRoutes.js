const express=require('express')
const router=express.Router();
const quizController= require('../controllers/quizController')


//Add a new quiz
router.post('/',quizController)

//Fetch a specific quiz
router.get('/',quizController)

//Fetch list of quizzes
router.get('/',quizController)

//Fetch leaderboard
router.get('/leaderboard',quizController)

module.exports=router
