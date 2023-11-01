import React, { useEffect, useMemo, useState } from "react";
import Button from "../../components/common/Button";
import { Link } from "react-router-dom";
import { DataFetcher } from "../../utils/hooks";
import api from "../../utils/api";
import axios from "axios";
import { Empty } from "antd";
import { BounceLoader } from "react-spinners";
const QuizListing = () => {
  const [color, setColor] = useState("#996CF1");
  const [totalScore, setTotalScore] = useState(0);
  const [quizList, setQuizList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let [loading, setLoading] = useState(true);

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

  return (
    <div className="overflow-clip">
      <form className="flex justify-center items-center  pt-10">
        <input
          className="rounded-xl px-5 py-3 lg:border-[1px] 
border-[1px] border-gray-400 drop-shadow-lg w-[80vw] lg:w-[50vw] z-9" 
          type="text"
          placeholder="Search for quiz..."
        />
    

      </form>
      <div className="flex flex-wrap justify-center p-10 w-[100vw]">
        {isLoading ||quizList.length<=0 ? (
         
          <>
          { quizList.length<=0?
          <div className="flex flex-col justify-center">
          <p className="font-lg font-normal text-center italic">
          Uh-oh! It seems there are no quizzes here... yet! Hint: You can click Create one 🕵️‍♂️
            </p>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /></div>:
             <div className="flex flex-col items-center">
          
             <BounceLoader
       color={color}
       loading={loading}
      //  cssOverride={override}
      className=" rounded-full"
       size={50}
       aria-label="Loading Spinner"
       data-testid="loader"
      />
       <h1>Loading...</h1>
             </div>
            }
        
          </>
        ) : (
          quizList.map((quiz) => (
            <div
              key={quiz._id}
              className="w-[90%]  lg:w-[25vw] md:w-[90vw] sm:w-[90vw] py-10 m-5 pl-10 pr-32 rounded-xl border-[1px] border-gray-200 hover:shadow-md hover:shadow-gray-500 hover:cursor-pointer hover:transition-all shadow shadow-gray-400"
            >
              <p className="text-2xl xl:whitespace-nowrap">{quiz.title}</p>
              <p className="text-base whitespace-nowrap text-gray-600 pt-3">
                Category: {quiz.category}
              </p>

              <Link to={`/takequiz/${quiz._id}`}>
                <Button
                  text="Take now"
                  style="text-white
         font-medium text-base px-4 whitespace-nowrap py-2 mt-4 rounded-lg bg-[#996CF1]"
                />
              </Link>
              <div className="pt-3 whitespace-nowrap text-gray-600">
                <p>Author: {quiz.author}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default QuizListing;
