import React, { useEffect, useState } from "react";
import Button from "../../components/common/Button";
import { ReactComponent as ConfettiIcon } from "../../assets/confetti.svg";
import { ReactComponent as BombIcon } from "../../assets/bomb.svg";
import ReactConfetti from "react-confetti";
import { useReward } from "react-rewards";
import api from "../../utils/api";

const QuizResult = ({ correct, incorrect }) => {
  const { reward, isAnimating } = useReward("rewardId", "confetti");
  const { reward: confettiReward, isAnimating: isConfettiAnimating } =
    useReward("confettiReward", "confetti");
  const { reward: balloonsReward, isAnimating: isBalloonsAnimating } =
    useReward("balloonsReward", "balloons");
  const { reward: confettiReward1, isAnimating: isConfettiAnimating1 } =
    useReward("confettiReward1", "confetti");
  const { reward: balloonsReward1, isAnimating: isBalloonsAnimating1 } =
    useReward("balloonsReward1", "balloons");
  const [screenSizeWidth, setScreenSizeWidth] = useState(window.innerWidth);
console.log(correct,"correct")
console.log(incorrect,"incorrect")
  
  return (
    <div className=" flex items-center justify-center">
      <div className="">
        {screenSizeWidth>=1024?
       ( <div>
        <div className="mb-4 flex flex-col justify-center items-center">
          {correct > incorrect ? (
            <div className="text-center">
              <div className="flex justify-evenly items-center">
                <button
                  disabled={isConfettiAnimating || isBalloonsAnimating}
                  onClick={() => {
                    confettiReward();
                    balloonsReward();
                  }}
                >
                  <span id="confettiReward" />
                  <span id="balloonsReward" />
                  <ConfettiIcon />
                </button>
                <div>
                  <p className="md:text-4xl text-2xl font-bold text-center px-8">
                    Congratulations!
                  </p>
                  <p className="text-sm text-gray-500">You did a great job.</p>
                  <p className="text-sm text-gray-500">
                    Click the confetti to see a surprise.
                  </p>
                </div>
                <div className="transform scale-x-[-1]">
                  <button
                    disabled={isConfettiAnimating1 || isBalloonsAnimating1}
                    onClick={() => {
                      confettiReward1();
                      balloonsReward1();
                    }}
                  >
                    <span id="confettiReward1" />
                    <span id="balloonsReward1" />
                    <ConfettiIcon />
                  </button>
                </div>
              </div>
            </div>
          ) : (
      <div className="text-center">
<div className="flex justify-evenly items-center">
  <button
    disabled={isConfettiAnimating || isBalloonsAnimating || correct<incorrect}
    onClick={() => {
      confettiReward();
      balloonsReward();
    }}
  >
    <span id="confettiReward" />
    <span id="balloonsReward" />
    <ConfettiIcon />
  </button>
  <div>
  <p className="md:text-3xl text-xl font-bold text-center mx-2">Try again!</p>
 
    <p className="text-sm text-gray-500">
    <p className="text-lg text-gray-500">You will do great.</p>
    </p>
  </div>
  <div className="transform scale-x-[-1]">
    <button
      disabled={isConfettiAnimating1 || isBalloonsAnimating1 || correct<incorrect}
      onClick={() => {
        confettiReward1();
        balloonsReward1();
      }}
    >
      <span id="confettiReward1" />
      <span id="balloonsReward1" />
      <ConfettiIcon />
    </button>
  </div>
</div>
</div>
         )
          }
        </div>
        <div className="mb- flex flex-col justify-center items-start">
          <p className="md:text-lg text-base">Your Score:</p>
          <div className="w-full flex flex-row justify-evenly">
            <p className="md:text-2xl pr-4 text-xl font-bold text-teal-600">
              {correct} Correct
            </p>
            <p className="md:text-2xl text-xl font-bold text-[#e73c37]">
              {incorrect} Incorrect
            </p>
          </div>
        </div>
        </div>):(



           //Mobile phone result view
        <>
        <div className="mb-4 flex flex-col justify-center items-center">
          {correct > incorrect ? (
            <div className="text-center">
              <div className="flex justify-evenly items-center">
                <div>
                  <p className="md:text-4xl text-2xl font-bold text-center px-8">
                    Congratulations!
                  </p>
                  <p className="text-sm text-gray-500">
                    Click the confetti to see a surprise.
                  </p>
                </div>
                <div className="transform scale-x-[-1]">
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="md:text-3xl text-xl font-bold text-center">Try again!</p>
              <p className="text-lg text-gray-500">You will do great.</p>
            </div>
          )}
        </div>
        {/* <h2 className="text-2xl font-semibold mb-4">{quizTitle}</h2> */}
        <div className="flex flex-row justify-evenly w-full items-center">
        <button
                  disabled={isConfettiAnimating || isBalloonsAnimating || correct<incorrect}
                  onClick={() => {
                    confettiReward();
                    balloonsReward();
                  }}
                >
                  <span id="confettiReward" />
                  <span id="balloonsReward" />
                  <BombIcon />
                </button>
        <div className="bg-[#996CF1] w-[140px] h-[140px] rounded-full flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center"> 
             <p className="text-5xl font-bold text-center text-white">
             {correct}
            </p>
            <p className="text-base font-medium text-center text-white">
              {`Out of ${correct+incorrect}`} 
            </p>
          </div>
        </div>
        <div className="transform scale-x-[-1]">
                  <button
                    disabled={isConfettiAnimating1 || isBalloonsAnimating1 || correct<incorrect}
                    onClick={() => {
                      confettiReward1();
                      balloonsReward1();
                    }}
                  >
                    <span id="confettiReward1" />
                    <span id="balloonsReward1" />
                    <BombIcon />
                  </button>
                </div>
        </div>
          </>
        )
          }
      </div>
    </div>
  );
};

export default QuizResult;
