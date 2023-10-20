import React from 'react'
import Button from '../../components/common/Button'

const QuizResult = ({correct,incorrect}) => {
  return (
    <div>
      <h1>Congratulations!</h1>
      <p>You got:</p>
      <p>{correct} Correct {incorrect} Incorrect</p>
      <Button text="Replay quiz" style=""/>
    </div>
  )
}

export default QuizResult
