import React from "react";
import Button from "../../components/common/Button";
import QuizListing from "./QuizListing";
import { Link } from "react-router-dom";

const HomePage = () => {
  const imgUrl =
    "https://res.cloudinary.com/dvqawl4nw/image/upload/v1697305300/ledbdynh68plu89ohsdn.jpg";

  return (
    <div className="overflow-clip">
      <div
        className="flex flex-row justify-start items-center h-[80vh]
     bg-[#E8AE05]  bg-cover bg-no-repeat g-[#F4C008] text-[#2c302e]"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dvqawl4nw/image/upload/v1697315680/w3rinb52rururtuk6ez7.jpg')",
        }}
      >
        <div className="flex flex-col justify-center">
          <h1 className="text-5xl font-bold px-10">
            QuizTime: Explore, Learn, Enjoy
          </h1>
          <p className=" break-normal px-10 pt-4">
            Your Gateway to Interactive Learning and Entertainment. Dive into a
            World of Quizzes and Expand Your Knowledge!
          </p>
          <div className="w-screen flex flex-row pt-10 justify-start px-10 items-center">
            <p className="font-bold text-xl ">Take a quiz</p>
            <p className="font-medium px-5">OR</p>
            <Link to="/createquiz">
              {" "}
              <Button
                style="text-white font-medium text-xl p-3 rounded-xl bg-[#996CF1]"
                text="Create one"
              />
            </Link>{" "}
          </div>
        </div>
        <div></div>
      </div>

      <div className="">
        <QuizListing />
      </div>
    </div>
  );
};

export default HomePage;
