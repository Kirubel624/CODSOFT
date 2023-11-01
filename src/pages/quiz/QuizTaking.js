import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuizResult from "./QuizResult";
import axios from "axios";
import api from "../../utils/api";
import Button from "../../components/common/Button";
import {notification } from 'antd';
const Context = React.createContext({
  name: 'Default',
});
const QuizTaking = () => {
  const [quiz, setQuiz] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const width = window.innerWidth;

  const height = window.innerHeight;
  const [timeElapsed, setTimeElapsed] = useState(0); // State to track time in seconds
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const navigate = useNavigate();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [notif, contextHolder] = notification.useNotification();
  const openNotification = (placement) => {
    notif.info({
      message: `You have missed a question`,
      description: <Context.Consumer>{({ name }) => `Please check!`}</Context.Consumer>,
      placement,
    });
  };
  const contextValue = useMemo(
    () => ({
      name: 'Ant Design',
    }),
    [],
  );
  const handleAnswerSelection = (questionId, selectedAnswer) => {
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [questionId]: selectedAnswer,
    }));
  };
  const [showModal, setShowModal] = useState(false);
console.log(selectedAnswers,"selectedAnswers")
  const openModal = () => {
    if(Object.keys(selectedAnswers).length<quiz.questions.length){
   openNotification('topRight')
    }
    else if(Object.keys(selectedAnswers).length===quiz.questions.length){setShowModal(true);}
  };

  const closeModal = () => {
    setShowModal(false);
  };
  React.useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    api
      .get(`/quiz/${id}`, { cancelToken: cancelToken.token })
      .then((res) => {
        setQuiz(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log("Request canceled");
        } else {
        }
      });
    return () => {
      cancelToken.cancel();
    };
  }, []);
  React.useEffect(() => {
    let score = 0;
    let arrOfQuestions = quiz.questions;
    if (!isLoading) {
      arrOfQuestions.map((data) => {
        const selectedAnswer = selectedAnswers[data._id];
        if (selectedAnswer === data.correctAnswer) {
          score++;
        }
      });
    }

    setTotalScore(score);
  }, [selectedAnswers, quiz, isLoading]);
  // console.log(quiz)
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeElapsed((prevTime) => prevTime + 1); // Increment the time elapsed by 1 second
    }, 1000); // Update every second

    return () => {
      clearInterval(timerInterval); // Clean up the interval when the component unmounts
    };
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

    if (hours > 0) {
      return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    } else if (minutes > 0) {
      return `${formattedMinutes}:${formattedSeconds}`;
    } else {
      return `0:${formattedSeconds}`;
    }
  };
  const timeDisplay = formatTime(timeElapsed);
  const handleRetake = (e) => {
    e.preventDefault();
    setShowModal(false);
    setSelectedAnswers({});
  };
  const userID = localStorage.getItem("userID");
  const handleSend = (cancelToken) => {
    api.patch(
      `/quiz/updatescore/${id}`,
      { userId: userID, score: totalScore },
      cancelToken,
    );
  };
  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    try {
      if (showModal) {
        handleSend({ cancelToken: cancelToken.token });
      }
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log("Request canceled");
      } else {
        //Canceled
      }
    }
    return () => {
      console.log("useEffect unmounts");
      cancelToken.cancel();
    };
  }, [showModal]);
  
  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
    <div className="flex flex-col justify-center items-center px-10 pt-16">
      <div className="flex flex-col justify-start items-start self">
        <p className="text-xl font-bold">{totalScore}</p>
        <p className="text-sm text-gray-500">Time Elapsed: {timeDisplay}</p>
        {/* <p>Current route: {location.pathname}</p> */}
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="boder-2 boder-red-600">
            {quiz.questions.map((questionItems, index) => (
              <div key={questionItems._id} className="py-3 flex flex-col">
                <p className="text-xl font-medium">
                  {index + 1}. {questionItems.questionText}
                </p>
                {questionItems.options.map((option, optionIndex) => (
      <div className="flex flex-col" key={optionIndex}>
        <label className="p-2" htmlFor={`choice-${questionItems._id}-${optionIndex}`}>
          <input
            type="radio"
            className="mr-2"
            id={`choice-${questionItems._id}-${optionIndex}`}
            name={`question-${questionItems._id}`}
            onChange={() =>
              handleAnswerSelection(questionItems._id, option)
            }
            checked={selectedAnswers[questionItems._id] === option}
          />
          {option}
        </label>
      </div>
    ))}
              </div>
            ))}
          </div>
        )}

        <button
          onClick={openModal}
          className=" text-white px-4 py-2 mb-10 rounded-lg bg-[#996CF1]"
          // disabled={Object.keys(selectedAnswers).length===0}
        >
          Submit
        </button>
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white flex items-center justify-center drop-shadow-lg shadow shadow-gray-400 rounded-lg py-10 px-24">
              <div className="modal-content flex flex-col items-center justify-center">
                <h2 className="md:text-2xl text-xl font-bold">Result</h2>
                <QuizResult
                  correct={totalScore}
                  incorrect={quiz.questions.length - totalScore}
                />

                <div className="flex flex-row w-full justify-around">
                  <Button
                    text="Retake Quiz"
                    style="bg-[#996CF1] font-medium text-white p-2 rounded mt-4"
                    onClick={handleRetake}
                  />
                  <Button
                    text="Back to home"
                    style="text-[#996CF1] font-medium border-2 border-[#996CF1] p-2 rounded mt-4"
                    onClick={() => navigate("/")}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </Context.Provider>
  );
};

export default QuizTaking;
