const Quiz = require('../models/quizModel');
const User = require('../models/userModel');

// Create a new quiz
exports.createQuiz = async (req, res) => {
  try {
    console.log("its gotten here ")
    console.log(req.body,"request body")

    const newQuiz = new Quiz(req.body);
    console.log("its gotten here 1 ")

    console.log(newQuiz,"request body")
    const savedQuiz = await newQuiz.save();
    console.log("Quiz saved request body")

    res.status(201).json(savedQuiz);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a list of all quizzes
exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a specific quiz by ID
exports.getQuizById = async (req, res) => {
  try {
    const quizId  = req.params.id;
    // console.log(req.params.id)
    const quiz = await Quiz.findById(quizId);
    console.log(quiz)
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a quiz by ID
exports.updateQuiz = async (req, res) => {
  try {
    const quizId  = req.params.id;
    const updatedQuiz = await Quiz.findByIdAndUpdate(quizId, req.body, { new: true });
    if (!updatedQuiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.json(updatedQuiz);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a quiz by ID
exports.deleteQuiz = async (req, res) => {
  try {
    const quizId  = req.params.id;
    const deletedQuiz = await Quiz.findByIdAndRemove(quizId);
    if (!deletedQuiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Add a new score for a user in a specific quiz
exports.addScoreToQuiz = async (req, res) => {
  try {
    const quizId  = req.params.id;
    console.log(quizId,"6^^^^^^^^^^^^^^^^")
    const { userId, score } = req.body;
    console.log(req.body,")))))))))))))))))")
    const quiz = await Quiz.findById(quizId);


    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    const existingScore = quiz.userScores.find((entry) => entry.userID === userId);
// console.log(existingScore.score);
console.log(existingScore,"existing score")
    if (existingScore!==undefined && existingScore.score<score) {
      console.log("it got here")
      existingScore.score = score;

    } 
    if(existingScore===undefined) {
    // console.log(quiz,"%%%%%%%%%%%%%")
    console.log("it got here 1")

      quiz.userScores.push({ userID: userId, score });
    }else{
      console.log("Already highest score");
    }

    quiz.userScores.sort((a, b) => b.score - a.score);

    await quiz.save();

    res.json(quiz);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get the leaderboard for a specific quiz
exports.getQuizLeaderboard = async (req, res) => {
    try {
      const quizId  = req.params.id;
      console.log(quizId)
      const quiz = await Quiz.findById(quizId);
      // console.log(quiz)
  
      if (!quiz) {
        return res.status(404).json({ message: 'Quiz not found' });
      }
  
      // const leaderboard = [];
      console.log("it got here 1w")
      console.log(quiz.userScores)
      // for (const entry of quiz.userScores) {
      //   console.log(entry.score,"ddddddddd")
      //   console.log(User)
      //   const user = await User.findById(entry.userID);
      //   console.log(user.username,"username")
      //   if (user) {
      //     leaderboard.push({
      //       user: {
      //         username: user.username,
      //         userId: user._id,
      //       },
      //       score: entry.score,
      //     });
      // console.log("it got here 2")

      //   }
      // }
  
      const leaderboard=quiz.userScores.sort((a, b) => b.score - a.score);
  
      res.json(leaderboard);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
