const express=require('express')
const router=express.Router();
const quizController= require('../controllers/quizController')

//Add a new quiz
router.post('/',quizController.createQuiz)

//Update quiz
router.put('/:id',quizController.updateQuiz)

//Delete quiz
router.delete('/:id',quizController.deleteQuiz)

//Update user quiz score
router.patch('/updatescore/:id',quizController.addScoreToQuiz)

//Fetch a specific quiz
router.get('/:id',quizController.getQuizById)

//Fetch list of quizzes
router.get('/',quizController.getAllQuizzes)

//Fetch leaderboard
router.get('/leaderboard/:id',quizController.getQuizLeaderboard)

module.exports=router
