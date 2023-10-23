import React,{useState} from 'react'
import { useLocation } from 'react-router-dom';
import QuizResult from './QuizResult';
import axios from 'axios';
import api from '../../utils/api';
const QuizTaking = () => {
  const[quiz,setQuiz]=useState([])
  const[color,setColor]=useState(false)
  const[totalScore,setTotalScore]=useState(0)
    const[isLoading,setIsLoading]=useState(true)
        
          const[alphabet]=useState( ["A","B","C","D"])
  const location = useLocation();
           const id=location.pathname.split("/")[2]
// console.log()
    // const QuizList={
    //   "quizzes": [
    //     {
    //       "id": 1,
    //       "category": "Science",
    //       "title": "Chemical Elements",
    //       "description": "Test your knowledge of chemical elements and their symbols.",
    //       "author": "John Doe",
    //       "questions": [
    //         {
    //           "id": 1,
    //           "questionText": "What is the chemical symbol for water?",
    //           "options": ["H2O", "CO2", "O2", "N2"],
    //           "correctAnswer": "H2O"
    //         },
    //         {
    //           "id": 2,
    //           "questionText": "What is the chemical symbol for helium?",
    //           "options": ["He", "Hl", "H", "H2"],
    //           "correctAnswer": "He"
    //         },
    //         {
    //           "id": 3,
    //           "questionText": "Which element is known as the 'noble gas'?",
    //           "options": ["Neon", "Sodium", "Argon", "Chlorine"],
    //           "correctAnswer": "Argon"
    //         }
            
            
    //       ]
    //     },
    //     {
    //       "id": 2,
    //       "category": "Maths",
    //       "title": "Algebra Basics",
    //       "description": "Test your algebra skills with this introductory quiz.",
    //       "author": "Jane Smith",
    //       "questions": [
    //         {
    //           "id": 2,
    //           "questionText": "What is 5 + 7?",
    //           "options": ["10", "12", "8", "14"],
    //           "correctAnswer": "12"
    //         },
    //         // Add more questions for this quiz
    //       ]
    //     },
    //     {
    //       "id": 3,
    //       "category": "Chemistry",
    //       "title": "Chemical Reactions",
    //       "description": "Explore chemical reactions and their principles.",
    //       "author": "Alice Johnson",
    //       "questions": [
    //         {
    //           "id": 3,
    //           "questionText": "What is the atomic number of oxygen?",
    //           "options": ["6", "8", "16", "22"],
    //           "correctAnswer": "8"
    //         },
    //         // Add more questions for this quiz
    //       ]
    //     }
    //     // Add more quizzes here
    //   ]
    // }
// const[answerItems,setAnswerItems]=useState([])
   
        //   const handleClick=(a,b)=>{

        // //  if(a===b){
        // //    setTotalScore(totalScore+1);
        // //   //  alert("you picked the correct answer")
        // //  }

        //   }
        const [selectedAnswers, setSelectedAnswers] = useState({});
          const handleAnswerSelection = (questionId, selectedAnswer) => {
            setSelectedAnswers((prevSelectedAnswers) => ({
              ...prevSelectedAnswers,
              [questionId]: selectedAnswer,
            }));
          };
          console.log(selectedAnswers,"Selected answers")
   
          const [showModal, setShowModal] = useState(false);

          const openModal = () => {
            setShowModal(true);
          };
        
          const closeModal = () => {
            setShowModal(false);
          };
  React.useEffect(()=>{
    const cancelToken=axios.CancelToken.source()
    api.get(`/quiz/${id}`,{cancelToken:cancelToken.token}).then((res)=>{
      setQuiz(res.data)
      setIsLoading(false)
    }).catch((err)=>{
        if(axios.isCancel(err)){
          console.log("Request canceled")
        }else{

        }
    })
    return()=>{
      cancelToken.cancel()
    }
  },[])
  React.useEffect(() => {
    let score = 0;
    let arrOfQuestions=quiz.questions
    if(!isLoading){
       console.log(Array.isArray(arrOfQuestions))
   arrOfQuestions.map((data)=>{
    const selectedAnswer=selectedAnswers[data._id]
   if(selectedAnswer===data.correctAnswer){
    score++;
   }
   })
    }
  //  quiz.questions.map((quiz)=>{
  
  //  })
   

      // quiz.questions.forEach((question) => {
      //   const selectedAnswer = selectedAnswers[question._id];
      //   if (selectedAnswer === question.correctAnswer) {
      //     score++;
      //   }
      // });

    setTotalScore(score);
  }, [selectedAnswers, quiz,isLoading]);
  // console.log(quiz)
  return (
    <div className='flex flex-col justify-center items-center px-10 pt-16'>
      <div className='flex flex-col justify-start items-start self'>
          <p className='text-xl font-bold'>{totalScore}</p>
          {/* <p>Current route: {location.pathname}</p> */}
      {isLoading?<p>Loading...</p>:(
       
        <div className='boder-2 boder-red-600'>
{
  quiz.questions.map((questionItems,index)=>(
  <div className='py-3 flex flex-col'>
    <p className='text-xl font-medium'>{index+1}. {questionItems.questionText}</p>
    {questionItems.options.map((option,index)=>(
      <label className='p-2' htmlFor='choice'>
<input type="radio" className='mr-2' id="choice" name={`question-${questionItems._id}`}
 onChange={()=>handleAnswerSelection(questionItems._id,option)} checked={selectedAnswers[questionItems._id]===option}/>
{option}
      </label>
      // 
    ))}
  </div>
  ))
}
        </div>
      )}
     
      <button onClick={openModal} className=' text-white px-4 py-2 rounded-lg bg-[#996CF1]'>Submit</button>
      {showModal && (<div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-[30vw] drop-shadow-lg shadow shadow-gray-400 rounded-lg p-10">
            <div className="modal-content">
              {/* Modal content goes here */}
              <h2 className="text-2xl font-bold">Result</h2>
              <QuizResult correct={totalScore} incorrect={quiz.questions.length-totalScore}/>
              <button onClick={closeModal} className="bg-blue-500 text-white p-2 rounded mt-4">Close Modal</button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  )
}

export default QuizTaking
