import React, { useEffect, useState, useMemo } from "react";
import api from "../../utils/api";
import Button from "../../components/common/Button";
import { Result, Select } from "antd";
import { useNavigate } from "react-router-dom";
import {notification,Form,Input,message } from 'antd';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const { Option } = Select;

function CreateQuiz() {
  const navigate=useNavigate()
  const [form]= Form.useForm()
  const [formInteracted,setFormInteracted]=useState(false)
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
  const[showModal,setShowModal]=useState(false)
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

    if (selectedQuizIndex !== null && options.filter(value => value === "").length<=2) {
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
    } else if(selectedQuizIndex===null&&questionText!=="" && options.filter(value => value === "").length<=2) {
      // We are not in edit mode, add a new question
      const shortID = generateShortID(12);
      const filteredOptions=options.filter(value => value!=="").map(value => value)
      console.log(filteredOptions,"filteeda $$$$$$$$$################################$$$")
      const newQuestion = {
        shortID,
        questionText,
        options:filteredOptions,
        correctAnswer,
      };
      setQuestions([...questions, newQuestion]);

      // Clear the form
      setQuestionText("");
      setOptions(["", "", "", ""]);
      setCorrectAnswer("");
    }else{
      toast.warn("A Question and at least 2 choices required",{
        position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      })
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
    console.log("in here at least")
    console.log(question,"************** at submit")
if(questions.length>0 &&question.title!==""&&question.description!==""&&question.category!==""){
    const finishedQuestion = {...question, questions}
    
    try{
    await  api.post("/quiz/",finishedQuestion)
    form.resetFields()
    setQuestions([])
    setShowModal(true)
   setQuestion({
      category: "",
      title: "",
      description: "",
    });

    }catch(err){
      console.log(err)
    }
    console.log(finishedQuestion,"*************finished question")}
    else{
toast.warn("Missing field",{
  position: "top-right",
autoClose: 3000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
})

      
    }
  };
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
console.log(question,"******* question")
  return (
    <>
 <ToastContainer
 position="top-right"
 limit={5}
 autoClose={3000}
 hideProgressBar={false}
 newestOnTop={true}
 closeOnClick
 rtl={false}
 pauseOnFocusLoss
 draggable
 pauseOnHover
 theme="light"
 />

    <div className="flex flex-wrap justify-around  px-4 pt-24 pb-6 bg-white rounded shadow">
      <div className="md:w-1/3">
      <h2 className="text-xl font-semibold">Quiz Question</h2>
      <Form 
      form={form}
      name="Addquiz"
      onSubmit={handleSubmit}
      >
        <Form.Item
        name="title"
        label={ <p className="text-base font-[500] font-sans">Quiz Title</p> }
        labelCol={{ span: 24 }} // Full width for the label
    wrapperCol={{ span: 24 }} // Full width for the input
        rules={[{
          required:true,
          message:"Quiz title is required"
        }]}
        >
<Input type="text" onChange={
       (e)=>       setQuestion({ ...question, title: e.target.value })

}
       className="h-[42px] text-lg"
placeholder="Quiz title eg. Programming quiz..."/>
        </Form.Item>
        <Form.Item
        name="description"
        label={ <p className="text-base font-[500] font-sans">Quiz Description</p> }
        labelCol={{ span: 24 }} // Full width for the label
        wrapperCol={{ span: 24 }} // Full width for the input
        rules={[{
          required:true,
          message:"Quiz description is required"
        }]}
        >
<Input type="text" onChange={(e)=>setQuestion({...question, description: e.target.value})}
       className="h-[42px] text-lg"
placeholder="Quiz descrpition"/>
        </Form.Item>
        <Form.Item 
        name="category"
        label={ <p className="text-base font-[500] font-sans">Quiz Category</p> }
        labelAlign="top" // Place the label on top
        labelCol={{ span: 24 }} // Full width for the label
    wrapperCol={{ span: 24 }} // Full width for the input
    
        rules={[
          {
          required:true,
          message:"Quiz category is required"
        }
      ]}
        >
        <Select 
       className="h-[42px] text-lg"
        placeholder="Select a category or add a custom one"
        onChange={(value) =>
          setQuestion({ ...question, category: value })
        }
        >
    <Option value="Chemistry">Chemistry</Option>
    <Option value="Mathematics">Mathematics</Option>
    <Option value="Physics">Physics</Option>
    <Option value="Programming">Programming</Option>
    <Option value="Biology">Biology</Option>
    <Option value="History">History</Option>
    <Option value="Geography">Geography</Option>
    <Option value="Literature">Literature</Option>
    <Option value="General Knowledge">General Knowledge</Option>
    <Option value="Custom">Custom</Option>
  </Select>
        </Form.Item>
      
        <div className="mb-4">
          <label
            htmlFor="questionText"
            className="block text-sm font-medium text-gray-700"
          >
            Question
          </label>
          <input
            type="text"
            id="questionText"
            className="mt-1 p-2 w-full rounded border border-gray-300 hover:border hover:ease-in  hover:border-[#4096FF] focus:outline  focus:outline-[#4096FF] focs:border-"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />
        </div>
        <label htmlFor="" className="font-medium">Choices</label>
        {options.map((option, index) => (

          <div key={index} className="flex space-x-2">
            <input
              type="text"
              className={`p-2 my-2 w-full rounded 
              ${options.length<2&&formInteracted?"border border-[#FF7875]":"border border-gray-300 "} `}
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              onBlur={()=>{setFormInteracted(true)}}
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
       {formInteracted&&options.length<2&& <p className="text-red-600">Choices are required</p>}
       {options.length<=4&& <button
          type="button"
          className="text-blue-600 hover:text-blue-800"
          onClick={addOption}
          disabled={options.length<2}
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
          {selectedQuizIndex === null?"Add Question":"Update Question"}
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-500 ml-4 text-white p-2 rounded hover:bg-blue-600"
        >
          Submit quiz
        </button>
      </Form>
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
                 {option!==""&& <label className="p-2" htmlFor="choice">
                    <input
                      type="radio"
                      className="mr-2"
                      id="choice"
                      name={`question-${questionItems.shortID}`}
                      onChange={() => handleAnswerSelection(questionItems.shortID, option)}
                      checked={selectedCorrectAnswer[questionItems.shortID] === option}
                    />
                    {option}
                  </label>}
                </div>
              ))}
              <p>Correct Answer : {selectedCorrectAnswer[questionItems.shortID]}</p>
            </div>
          ))}
        </div>
      </div>
      {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white flex items-center justify-center drop-shadow-lg shadow shadow-gray-400 rounded-lg py-10 px-24">
              <div className="modal-content flex flex-col items-center justify-center">
                <h2 className="md:text-2xl text-xl font-bold">Submitted Successfully</h2>
                <Result
    status="success"
    title="Do you want to add another quiz or go back home?"
    subTitle=""
    extra={[
      <Button
       text="Add another quiz"
      onClick={()=>setShowModal(false)}

        style="bg-[#996CF1] font-medium text-white p-2 rounded mt-4"
        />,
      <Button 
      text="Back to home" 
      onClick={()=>navigate('/')}

      style="text-[#996CF1] font-medium border-2 border-[#996CF1] p-2 rounded mt-4"
      />,
    ]}
  />
                </div>
                </div>
                </div>
)}
    </div>
    </>
  );
}

export default CreateQuiz;