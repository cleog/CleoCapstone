'use client'
import { useState } from 'react'
import questions from './questions.json'

export default function Home() {
  // Index of current question
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // Array of objects with answer by user
  const [selectedOptions, setSelectedOptions] = useState([]);

  // Citation: got the logic for lines 13-18 from Avneesh Agarwal in this tutorial to retain state: https://javascript.plainenglish.io/build-a-quiz-app-with-next-js-and-tailwindcss-f61b14148661 

  const handleAnswerOption = (answer) => {
    setSelectedOptions([
      (selectedOptions[currentQuestion] = { answerByUser: answer }),
    ]);
    setSelectedOptions([...selectedOptions]);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    alert('Quiz submitted! Your answers were: ' + JSON.stringify(selectedOptions.map((o) => o.answerByUser)));
    // Add my logic here
  };

  return (
    <main className="flex min-h-screen flex-col p-24">
      <div>
        <h1 className="mb-3 text-2xl text-center mt-10 font-semibold">Major Exploration Quiz</h1>
        <h2 className="mb-3 text-xl text-center mt-10">This quiz will recommend 3 College of Engineering majors that you may be a good fit for!</h2>
        <div className="flex flex-col mt-20 items-start w-full outline p-4 outline-orange/50 bg-slate-100/40">
          <h4 className="mt-10 text-xl text-black/60">Question {currentQuestion + 1} of {questions.length}</h4>
          <div className="mt-4 text-2xl text-black">
            {questions[currentQuestion].question}
          </div>
          <div className="mt-4 text-2xl text-black">
            {questions[currentQuestion].answerOptions.map((option, i) => (
              <div key={i}>
                <input 
                  type="radio" 
                  id={`${currentQuestion}-${i}`} 
                  name={`question-${currentQuestion}`}
                  onChange={(e) => handleAnswerOption(option.answer)}
                  checked={
                    option.answer === selectedOptions[currentQuestion]?.answerByUser
                  }
                  value={option.answer} 
                  />
                <label htmlFor={`${currentQuestion}-${i}`}>{option.answer}</label>
              </div>
            ))}
          </div>
          <span>
            <button className="bg-orange text-white mr-4" onClick={handlePrevious}>Previous</button>
            {currentQuestion === questions.length - 1 ? (
              <button className="bg-orange text-white" onClick={handleSubmit}>Submit</button>
            ) : (
              <button className="bg-orange text-white" onClick={handleNext}>Next</button>
            )}
          </span>
        </div>
      </div>
    </main>
  )
}