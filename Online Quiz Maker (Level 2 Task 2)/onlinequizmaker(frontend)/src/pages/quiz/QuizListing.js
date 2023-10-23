import React, { useEffect, useMemo, useState } from 'react'
import Button from '../../components/common/Button';
import { Link } from 'react-router-dom';
import { DataFetcher } from '../../utils/hooks';
import api from '../../utils/api';
import axios from 'axios';
const QuizListing = () => {
    const[color,setColor]=useState(false)
    const[totalScore,setTotalScore]=useState(0)
    const[quizList,setQuizList]=useState([])
    const[isLoading,setIsLoading]=useState(true)
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
    //         // Add more questions for this quiz
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
    
    // useEffect(()=>{

    // },[response])
    
      //  let alphabet="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  

      //  const handleClick=(a,b)=>{
      // if(a===b){
      //   setTotalScore(totalScore+1);
      // }
      //  }
      //  const quiz = useMemo(() => quizList, [quizList]);

       useEffect(() => {
        console.log("useEffect mounts")

        let subscribed=true;
        // const controller=new AbortController()
        // const signal=controller.signal;
        const cancelToken=axios.CancelToken.source()
        api.get("/quiz",{cancelToken:cancelToken.token}).then((res)=>{
          setQuizList(res.data)
          setIsLoading(false)
        }).catch((err) => {
              if(axios.isCancel(err)){
                console.log("Request canceled")
  
              }else{
                //Canceled
              }
             });
        //  fetch("http://localhost:9000/quiz/",{ signal })
        //    .then((res) => res.json())
        //    .then((data) => {
        //     if(subscribed){
        //        setQuizList(data);
        //      console.log(data, "Data Fetched");
        //     }
            
        //    })
           return ()=>{
            // controller.abort()
            // subscribed=false;
            console.log("useEffect unmounts")
            cancelToken.cancel()
           }
       }, []);
  return (
    <div className='overflow-clip'>

<form className='flex justify-center items-center  pt-10'>

<input className='rounded-xl px-5 py-3 lg:border-[1px] 
border-[1px] border-gray-400 drop-shadow-lg w-[80vw] lg:w-[50vw]' type="text" placeholder='Search for quiz...'/>
 
</form>
    <div className='flex flex-wrap justify-center p-10 w-[100vw]'>
   
        {
      
  isLoading?<h1>Loading...</h1>: ( 
        quizList.map((quiz)=>(
          <div key={quiz._id} className='w-[90%]  lg:w-[25vw] md:w-[90vw] sm:w-[90vw] py-10 m-5 pl-10 pr-32 rounded-xl border-[1px] border-gray-200 hover:shadow-md hover:shadow-gray-500 hover:cursor-pointer hover:transition-all shadow shadow-gray-400'>
        <p className='text-2xl whitespace-nowrap'>{quiz.title}</p>
        <p className='text-base whitespace-nowrap text-gray-600 pt-3'>Category: {quiz.category}</p>

      

       <Link to={`/takequiz/${quiz._id}`}>
        <Button text="Take now" style="text-white
         font-medium text-base px-4 py-2 mt-4 rounded-lg bg-[#996CF1]"/>
        </Link>
<div className='pt-3 whitespace-nowrap text-gray-600'><p>Author: {quiz.author}</p></div>

    </div>
        
        ))
      )
  }
    </div></div>
  )
}

export default QuizListing
