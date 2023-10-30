import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import Button from "../../components/common/Button";

function CreateQuiz() {
  const [question, setQuestion] = useState({
    category: "",
    title: "",
    description: "",
    author: "",
    authorID:""
  });

  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [selectedCorrectAnswer, setSelectedCorrectAnswer] = useState({});
  const [selectedQuizIndex, setSelectedQuizIndex] = useState(null);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  // const[editView,setEditView]=useState(false)
  const author=localStorage.getItem("username")
  const authorID=localStorage.getItem("userID")
  // const[questions, setQuestions]=useState([])
  const addOption = () => {
    setOptions([...options, ""]);
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const removeOption = (index) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1);
    setOptions(updatedOptions);
  };
  const populateEditForm = (index) => {
    const selectedQuestion = questions[index];
    setQuestionText(selectedQuestion.questionText);
    setOptions(selectedQuestion.options);
    setCorrectAnswer(selectedQuestion.correctAnswer);
    setSelectedQuizIndex(index);
  };
  // Function to add or update a question
  const handleAddOrUpdateQuestion = (e) => {
    e.preventDefault();
    setQuestion({ ...question, author, authorID });
    const correctAnswer = options[correctAnswerIndex];
    console.log(question,"************** at add or update")

    if (selectedQuizIndex !== null) {
      // We are in edit mode, update the existing question
      const updatedQuestions = [...questions];
      const selectedQuestion = updatedQuestions[selectedQuizIndex];
      selectedQuestion.questionText = questionText;
      selectedQuestion.options = options;
      selectedQuestion.correctAnswer = correctAnswer;
      setQuestions(updatedQuestions);

      // Clear the form
      setQuestionText("");
      setOptions(["", "", "", ""]);
      setCorrectAnswer("");
      setSelectedQuizIndex(null);
    } else {
      // We are not in edit mode, add a new question
      const shortID = generateShortID(12);
      const newQuestion = {
        shortID,
        questionText,
        options,
        correctAnswer,
      };
      setQuestions([...questions, newQuestion]);

      // Clear the form
      setQuestionText("");
      setOptions(["", "", "", ""]);
      setCorrectAnswer("");
    }
  };

  useEffect(() => {
    // Initialize the selectedCorrectAnswer state after questions have been populated
    const initialSelectedCorrectAnswer = {};
    questions.forEach((question) => {
      initialSelectedCorrectAnswer[question.shortID] = question.correctAnswer;
    });
    setSelectedCorrectAnswer(initialSelectedCorrectAnswer);
  }, [questions]);
  // console.log(questions,"**************")
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(question,"************** at submit")

    const finishedQuestion = {
      quizzes: [{ ...question, questions}],
    };
    try{
    await  api.post("/quiz/",finishedQuestion)
    }catch(err){
      console.log(err)
    }
    console.log(finishedQuestion,"*************finished question")
  };
  // const handleAnswerSelection=(id,selectedAnswer)=>{
  // setSelectedCorrectAnswer((prevSelectedAnser)=>({
  //   ...prevSelectedAnser,
  //   [id]:selectedAnswer
  // }))
  // setCorrectAnswer(selectedCorrectAnswer[id])
  // console.log(selectedCorrectAnswer,"selected answer")
  // }
  function generateShortID(length) {
    const characters = '0123456789abcdef';
    let shortID = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      shortID += characters.charAt(randomIndex);
    }
  
    return shortID;
  }
  console.log(correctAnswer,"correctAnswer$$$$$$$$$$$$$")
  // Usage in your React component to generate a 12-character ID
  const handleAnswerSelection = (id, selectedAnswer) => {
    if (selectedQuizIndex !== null) {
      const updatedQuestions = [...questions];
      updatedQuestions[selectedQuizIndex].correctAnswer = selectedAnswer;
      setQuestions(updatedQuestions);
      setSelectedCorrectAnswer({
        ...selectedCorrectAnswer,
        [id]: selectedAnswer,
      });
    }
  };
  
  const handleQuestionDelete = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  return (
    <div className="flex flex-wrap justify-around  px-4 pt-24 pb-6 bg-white rounded shadow">
      <div className="md:w-1/3">
      <h2 className="text-xl font-semibold">Quiz Question</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="questionTitle"
            className="block text-sm font-medium text-gray-700"
          >
            Quiz Title
          </label>
          <input
            type="text"
            id="questionTitle"
            className="mt-1 p-2 w-full rounded border border-gray-300"
            value={question.title}
            onChange={(e) =>
              setQuestion({ ...question, title: e.target.value })
              
            }
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="questionDescription"
            className="block text-sm font-medium text-gray-700"
          >
            Quiz Description
          </label>
          <input
            type="text"
            id="questionDescription"
            className="mt-1 p-2 w-full rounded border border-gray-300"
            value={question.description}
            onChange={(e) =>
              setQuestion({ ...question, description: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="questionText"
            className="block text-sm font-medium text-gray-700"
          >
            Quiz Category
          </label>
          <select
            type="text"
            id="questionCategory"
            className="mt-1 p-2 w-full rounded border border-gray-300"
            value={question.category}
            onChange={(e) =>
              setQuestion({ ...question, category: e.target.value })
            }
          >
            <option value="Chemistry">Chemistry</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Physics">Physics</option>
            <option value="Programming">Programming</option>

          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="questionText"
            className="block text-sm font-medium text-gray-700"
          >
            Question Text
          </label>
          <input
            type="text"
            id="questionText"
            className="mt-1 p-2 w-full rounded border border-gray-300"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />
        </div>
        <label htmlFor="">Choices</label>
        {options.map((option, index) => (
          <div key={index} className="flex space-x-2">
            <input
              type="text"
              className="p-2 w-full rounded border border-gray-300"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
            />
           {index>1&& <button
              type="button"
              className="text-red-600 hover:text-red-800"
              onClick={() => removeOption(index)}
            >
              Remove
            </button>}
          </div>
        ))}
       {options.length<=4&& <button
          type="button"
          className="text-blue-600 hover:text-blue-800"
          onClick={addOption}
        >
          Add Option
        </button>}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Correct Answer
          </label>
          <select
              value={correctAnswer}
              onChange={(e) => {
                setCorrectAnswerIndex(e.target.selectedIndex); // Update the index
                setCorrectAnswer(e.target.value);
              }}
              className="mt-1 p-2 w-full rounded border border-gray-300"
            >
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
        </div>
        <button
          onClick={handleAddOrUpdateQuestion}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Question
        </button>
        <button
          type="submit"
          className="bg-blue-500 ml-4 text-white p-2 rounded hover:bg-blue-600"
        >
          Submit quiz
        </button>
      </form>
      </div>
      <div>
        <h2 className="text-xl font-semibold">Your added Questions will appear here</h2>
        <div className="boder-2 boder-red-600">
          {questions && questions.map((questionItems, index) => (
            <div key={questionItems.shortID} className="py-3 flex flex-col">
              <div className="flex flex-row justify-between mb-2">
                <Button
                  text="Edit"
                  onClick={() => populateEditForm(index)} // Populate the form for editing
                  style="px-4 text-white rounded-xl py-2 bg-[#996CF1]"
                />      
                <Button
                  text="Delete"
                  style="px-4 text-white rounded-xl py-2 bg-[#e73c37]"
                  onClick={() => handleQuestionDelete(index)} 
                />
              </div>
              <p className="text-xl font-medium">
                {index + 1}. {questionItems.questionText}
              </p>
              {questionItems.options.map((option, optionIndex) => (
                <div className="flex flex-col" key={questionItems.shortID + optionIndex}>
                  <label className="p-2" htmlFor="choice">
                    <input
                      type="radio"
                      className="mr-2"
                      id="choice"
                      name={`question-${questionItems.shortID}`}
                      onChange={() => handleAnswerSelection(questionItems.shortID, option)}
                      checked={selectedCorrectAnswer[questionItems.shortID] === option}
                    />
                    {option}
                  </label>
                </div>
              ))}
              <p>Correct Answer : {selectedCorrectAnswer[questionItems.shortID]}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default CreateQuiz;