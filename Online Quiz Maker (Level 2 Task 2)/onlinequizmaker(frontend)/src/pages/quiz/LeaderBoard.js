// src/components/Leaderboard.js
import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import { Empty, Modal } from "antd";
import Button from '../../components/common/Button'
import axios from "axios";
import { SmileOutlined } from '@ant-design/icons';
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
            className="w-[90%]  lg:w-[25vw] md:w-[90vw] sm:w-[90vw]  py-10 m-5 pl-10 pr-32 rounded-xl border-[1px] border-gray-200 hover:shadow-md hover:shadow-gray-500 hover:cursor-pointer hover:transition-all shadow shadow-gray-400"
          >
            <p className="text-2xl whitespace-nowrap">{quiz.title}</p>
            <p className="text-base whitespace-nowrap text-gray-600 pt-3">
              Category: {quiz.category}
            </p>

            <Button
              text="View leaderboard"
              style="text-white
         font-medium text-base px-4 py-2 mt-4 rounded-lg bg-[#996CF1] whitespace-nowrap"
              onClick={() => fetchLeaderBoard(quiz._id)}
            />
            <Modal
              onCancel={handleCancelLeaderBoardView}
              footer={null}
              open={viewLeaderBoard}
             
            >
              <div className="w-[100%] p-[-10px] mt-8">
                <h1 className="text-3xl font-semibold mb-14">Leaderboard</h1>
               {leaderboard.length>0?<>
                <div className="grid grid-cols-3 pb-5">
    {/* <div className="absolute bottom-0 left-0 "></div> */}
  <div className="col-start-2 col-span-1">
    <div className="p-4 rounded-lg text-center h-3/4 bg-gradient-to-b from-yellow-400 to-transparent flex flex-col items-center mt-[-20px]">
      <img className="pb-10" src="https://res.cloudinary.com/dvqawl4nw/image/upload/v1698773096/rvm8j2tv2jif5u32tdol.png" alt="Crown"/>
      <img src={`https://ui-avatars.com/api/?name=${leaderboard[0].user.username}`} alt={`Avatar of ${leaderboard[0].user.username}`} 
      className="mx-auto rounded-full mt-[-50px] border-[4px]  border-yellow-400 h-[6rem] w-[6rem]" />
      <p className="font-bold text-xl">{leaderboard[0].user.username}</p>
      <p className="font-bold text-lg text-yellow-400"> {leaderboard[0].score}</p>
    </div>
  </div>

  <div className="col-start-1 col-end-2">
    <div className="p-4 rounded-lg text-center h- bg-gradient-to-b from-blue-400 to-transparent  flex flex-col items-center mt-[-100px]">
      <img src={`https://ui-avatars.com/api/?name=${leaderboard[2].user.username}`} alt={`Avatar of ${leaderboard[2].user.username}`} 
      className="mx-auto rounded-full mt-[-50px] border-[4px] border-orange-400 h-[4rem] w-[4rem]" />
      <p className="font-bold text-xl">{leaderboard[2].user.username}</p>
      <p className="font-bold text-lg text-blue-400">{leaderboard[2].score}</p>
    </div>
  </div>
  <div className="col-start-3 col-end-4">
    <div className="p-4 rounded-lg text-center  bg-gradient-to-b from-green-400 to-transparent  flex flex-col items-center mt-[-150px]">
      
      <img src={`https://ui-avatars.com/api/?name=${leaderboard[1].user.username}`} alt={`Avatar of ${leaderboard[1].user.username}`} 
      className="mx-auto rounded-full mt-[-50px] border-[4px] h-[4rem] w-[4rem]  border-gray-400" />
      <p className="font-bold text-xl">{leaderboard[1].user.username}</p>
      <p className="font-bold text-lg text-green-400">{leaderboard[1].score}</p>
    </div>
  </div>
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
        <td className="text-left pl-4">{index + 4}</td>
        <td className="flex items-center py-3">
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
</table></>:
<>
<p className="font-lg font-normal text-center italic">
  Lead the way! Be the trailblazer on the leaderboard.
  </p>

  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
 
</>}

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
