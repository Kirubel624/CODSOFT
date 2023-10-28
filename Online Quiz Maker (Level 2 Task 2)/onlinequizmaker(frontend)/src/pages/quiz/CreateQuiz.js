import React, { useState } from "react";
import api from "../../utils/api";

function CreateQuiz() {
  const [question, setQuestion] = useState({
    category: "",
    title: "",
    description: "",
    author: "",
  });

  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [questions, setQuestions] = useState([]);
  const author=localStorage.getItem("username")
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
  const handleQuestionAdd = (e) => {
    e.preventDefault();

    // Create a new question object
    const newQuestion = {
      questionText,
      options,
      correctAnswer,
    };

    // You can send this newQuestion to your server or save it as needed
    setQuestions([...questions, newQuestion]);

    // console.log(finishedQuestion)
    // Clear the form
    setQuestionText("");
    setOptions(["", "", "", ""]);
    setCorrectAnswer("");
    setQuestion({...question, author:author})

  };
  // console.log(questions,"**************")
  const handleSubmit = async (e) => {
    e.preventDefault();
    const finishedQuestion = {
      quizzes: [{ ...question, questions }],
    };
    try{
    await  api.post("/quiz/",finishedQuestion)
    }catch(err){
      console.log(err)
    }
    
    console.log(finishedQuestion,"*************finished question")
  };

  return (
    <div className="max-w-md mx-auto px-4 pt-24 pb-6 bg-white rounded shadow">
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
            <button
              type="button"
              className="text-red-600 hover:text-red-800"
              onClick={() => removeOption(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className="text-blue-600 hover:text-blue-800"
          onClick={addOption}
        >
          Add Option
        </button>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Correct Answer
          </label>
          <select
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
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
          onClick={handleQuestionAdd}
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
  );
}

export default CreateQuiz;
