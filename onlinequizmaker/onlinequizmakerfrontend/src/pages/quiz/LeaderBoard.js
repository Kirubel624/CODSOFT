// src/components/Leaderboard.js
import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import { Empty, Modal } from "antd";
import Button from '../../components/common/Button'
import axios from "axios";
import { BounceLoader } from "react-spinners";

const Leaderboard = () => {
  const [quizList, setQuizList] = useState([]);
  const [leaderboard, setLeaderBoard] = useState([]);
  const [viewLeaderBoard, setViewLeaderboard] = useState(false);
  const [isLoadingQuiz, setIsLoadingQuiz] = useState(true);
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState(false);
  const [color, setColor] = useState("#996CF1");

  const fetchQuizList = (cancelToken) => {
    setIsLoadingQuiz(true);

    api.get("/quiz",cancelToken)
      .then((res) => {
        setQuizList(res.data);
        setIsLoadingQuiz(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log("Request canceled");
          setIsLoadingQuiz(false);
        // Handle the error
        } else {
          //Canceled
        }
      
      });
  };

  const fetchLeaderBoard = (id) => {
    setIsLoadingLeaderboard(true);

    // Request for leaderboard
    api.get(`/quiz/leaderboard/${id}`)
      .then((leaderboard) => {
        setLeaderBoard(leaderboard.data);
        setIsLoadingLeaderboard(false);
        setViewLeaderboard(true);
      })
      .catch((error) => {
        setIsLoadingLeaderboard(false);
        // Handle the error
      });
  };

  useEffect(() => {
    const cancelToken=axios.CancelToken.source()
    fetchQuizList({cancelToken:cancelToken.token});
    return () => {
      // controller.abort()
      // subscribed=false;
      console.log("useEffect unmounts");
      cancelToken.cancel();
    };
  }, []);
console.log(leaderboard,"Leaderboard###########")
  return (
    <div className=" pt-24 flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold">🏆Leaderboard🏆</h1>
    <div className="flex flex-wrap justify-center px-10 pt-12 pb-10 w-[100%] ">
    
      {isLoadingQuiz || quizList.length <= 0 ? (
        <>
          {!isLoadingQuiz && quizList.length === 0&& (
            <div className="flex flex-col justify-center">
              <p className="font-lg font-normal text-center italic">
                Lead the way! Be the trailblazer on the leaderboards.
              </p>
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
          )}
          {isLoadingQuiz && (
            <div className="flex flex-col items-center">
              <h1 className="pb-4">Loading</h1>
              <BounceLoader
                color={color}
                loading={isLoadingQuiz}
                size={50}
                aria-label="Loading Quiz List"
                data-testid="quiz-loader"
              />
            </div>
          )}
        </>
      ) : (
        quizList.map((quiz) => (
          <div
            key={quiz._id}
            className="w-[90%]  lg:w-[25vw] md:w-[90vw] sm:w-[90vw]  py-10 m-5 pl-10 pr-32 rounded-xl border-[1px] border-gray-200 hover:shadow-md hover:shadow-gray-500 hover:cursor-pointer hover:transition-all shadow shadow-gray-400"
          >
            <p className="text-2xl break-normal">{quiz.title}</p>
            <p className="text-base whitespace-nowrap text-gray-600 pt-3">
              Category: {quiz.category}
            </p>
            <Button
              text="View leaderboard"
              style="text-white font-medium text-base px-4 py-2 mt-4 rounded-lg bg-[#996CF1] whitespace-nowrap"
              onClick={() => fetchLeaderBoard(quiz._id)}
            />
            <Modal
              onCancel={() => setViewLeaderboard(false)}
              footer={null}
              open={viewLeaderBoard}
            >
              {isLoadingLeaderboard ? (
                <div className="text-center">
                  <h1>Loading Leaderboard...</h1>
                  <BounceLoader
                    color={color}
                    loading={isLoadingLeaderboard}
                    size={50}
                    aria-label="Loading Leaderboard"
                    data-testid="leaderboard-loader"
                  />
                </div>
              ) : (
                 <div className="w-[100%] p-[-10px] mt-8">
                <h1 className="text-3xl font-semibold mb-14">Leaderboard</h1>
               {leaderboard.length>0?<>
                <div className="grid grid-cols-3 pb-5">
    {/* <div className="absolute bottom-0 left-0 "></div> */}
  <div className="col-start-2 col-span-1">
    <div className="p-4 rounded-lg text-center h-3/4 bg-gradient-to-b from-yellow-400 to-transparent flex flex-col items-center mt-[-20px]">
      <img className="pb-10" src="https://res.cloudinary.com/dvqawl4nw/image/upload/v1698773096/rvm8j2tv2jif5u32tdol.png" alt="Crown"/>
      <img src={`https://ui-avatars.com/api/?name=${leaderboard[0]?.user?.username}`} alt={`Avatar of ${leaderboard[0]?.user?.username}`} 
      className="mx-auto rounded-full mt-[-50px] border-[4px]  border-yellow-400 h-[6rem] w-[6rem]" />
      <p className="font-bold text-xl">{leaderboard[0]?.user?.username}</p>
      <p className="font-bold text-3xl text-yellow-400"> {leaderboard[0]?.score}</p>
    </div>
  </div>

  <div className="col-start-1 col-end-2">
    <div className="p-4 rounded-lg text-center h- bg-gradient-to-b from-blue-400 to-transparent  flex flex-col items-center mt-[-100px]">
      <img src={`https://ui-avatars.com/api/?name=${leaderboard[2]?.user?.username}`} alt={`Avatar of ${leaderboard[2]?.user?.username}`} 
      className="mx-auto rounded-full mt-[-50px] border-[4px] border-orange-400 h-[4rem] w-[4rem]" />
      <p className="font-bold text-xl">{leaderboard[2]?.user?.username}</p>
      <p className="font-bold text-lg text-blue-400">{leaderboard[2]?.score}</p>
    </div>
  </div>
  <div className="col-start-3 col-end-4">
    <div className="p-4 rounded-lg text-center  bg-gradient-to-b from-green-400 to-transparent  flex flex-col items-center mt-[-150px]">
      
      <img src={`https://ui-avatars.com/api/?name=${leaderboard[1]?.user?.username}`} alt={`Avatar of ${leaderboard[1]?.user?.username}`} 
      className="mx-auto rounded-full mt-[-50px] border-[4px] h-[5rem] w-[5rem]  border-gray-400" />
      <p className="font-bold text-xl">{leaderboard[1]?.user?.username}</p>
      <p className="font-bold text-lg text-green-400">{leaderboard[1]?.score}</p>
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
              )}
            </Modal>
            <div className="pt-3 whitespace-nowrap text-gray-600">
              <p>Author: {quiz.author}</p>
            </div>
          </div>
        ))
      )}
    </div></div>
  );
};

export default Leaderboard;
