// src/components/Leaderboard.js
import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import { Modal } from "antd";
import Button from '../../components/common/Button'
import axios from "axios";

const Leaderboard = () => {
  const [quizList, setQuizList] = useState([]);
  const [leaderboard, setLeaderBoard] = useState([]);
  const [viewLeaderBoard, setViewLeaderboard] = useState(false);
  const[isLoading, setIsLoading]=useState(true)
  const fetchLeaderBoard = (id) => {
    api
      .get(`/quiz/leaderboard/${id}`)
      .then((leaderboard) => setLeaderBoard(leaderboard.data))
      .then(setViewLeaderboard(true));
  };
  useEffect(() => {
    console.log("useEffect mounts");

    let subscribed = true;
    // const controller=new AbortController()
    // const signal=controller.signal;
    const cancelToken = axios.CancelToken.source();
    api
      .get("/quiz", { cancelToken: cancelToken.token })
      .then((res) => {
        setQuizList(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log("Request canceled");
        } else {
          //Canceled
        }
      });
    return () => {
      // controller.abort()
      // subscribed=false;
      console.log("useEffect unmounts");
      cancelToken.cancel();
    };
  }, []);
  const username = localStorage.getItem("username");
  const handleCancelLeaderBoardView = () => {
    setViewLeaderboard(false);
  };
  return (
    <div className="flex flex-wrap justify-center px-10 pt-24 pb-10 w-[100%] ">
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        quizList.map((quiz) => (
          <div
            key={quiz._id}
            className="w-[90%]  lg:w-[25vw] md:w-[90vw] sm:w-[90vw] py-10 m-5 pl-10 pr-32 rounded-xl border-[1px] border-gray-200 hover:shadow-md hover:shadow-gray-500 hover:cursor-pointer hover:transition-all shadow shadow-gray-400"
          >
            <p className="text-2xl whitespace-nowrap">{quiz.title}</p>
            <p className="text-base whitespace-nowrap text-gray-600 pt-3">
              Category: {quiz.category}
            </p>

            <Button
              text="View leaderboard"
              style="text-white
         font-medium text-base px-4 py-2 mt-4 rounded-lg bg-[#996CF1]"
              onClick={() => fetchLeaderBoard(quiz._id)}
            />
            <Modal
              onCancel={handleCancelLeaderBoardView}
              footer={null}
              open={viewLeaderBoard}
            >
              <div className="container mx-auto mt-8">
                <h1 className="text-3xl font-semibold mb-4">Leaderboard</h1>
                <div className="grid grid-cols-3 gap-4">
  {leaderboard.slice(0, 3).map((user, index) => (
    <div
      key={user.id}
      className={`bg-${index === 0 ? 'gold' : index === 1 ? 'silver' : 'bronze'}-200 p-4 rounded-lg text-center`}
    >
      <img
        src={`https://ui-avatars.com/api/?name=${user.user.username}`}
        alt={`Avatar of ${user.user.username}`}
        className="w-20 h-20 mx-auto rounded-full"
      />
      <p className="font-bold">{user.user.username}</p>
      <p className="font-bold">{user.score}</p>
    </div>
  ))}
</div>
                <table className="table-auto w-full">
  <thead>
    <tr>
      <th className="text-left">Rank</th>
      <th className="text-left">User</th>
      <th className="text-left">Score</th>
    </tr>
  </thead>
  <tbody>
    {leaderboard.slice(3,leaderboard.length).map((user, index) => (
      <tr key={user.id} className={index % 2 === 0 ? "bg-gray-100" : ""}>
        <td className="text-left">{index + 4}</td>
        <td className="flex items-center">
          <img
            src={`https://ui-avatars.com/api/?name=${user.user.username}`}
            alt={`Avatar of ${user.user.username}`}
            className="w-8 h-8 rounded-full mr-2"
          />
          <p>{user.user.username}</p>
        </td>
        <td className="text-left">{user.score}</td>
      </tr>
    ))}
  </tbody>
</table>

              </div>
            </Modal>
            <div className="pt-3 whitespace-nowrap text-gray-600">
              <p>Author: {quiz.author}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Leaderboard;
