'use client'
import { useState, useEffect } from 'react'
// import questions from './questions.json'
// TODO: Delete this from here and import from the API
import majors from '../majors/majorsList.json'
import { countBy } from 'lodash'



// results is an array of entries of the form [shortcode, count, majorObject] where shortcode is the major's shortcode, count is the number of times it appeared in the user's matches, and majorObject is the major object from the majorsList.json file
const ResultsView = ({ results }) => {
  return (
    results.length === 0 ? <p className='py-8'>Results will show after submitting the quiz!</p> :
      <div className="flex flex-col mt-20 items-start w-full outline p-4 outline-orange/50 bg-orange/10">
        <h3 className='py-8 text-xl font-bold'>Your 3 Recommended Majors:</h3>
        {
          results.slice(0, 3).map((r, i) => (
            <p key={i}>
              <strong className="text-l">{r[2].name}</strong>
              <ul className='pb-8 text-lg'>
                <li>Campus: {r[2].campus} </li>
                <li>Questions that matched: {r[1]}</li>
              </ul>
            </p>
          ))
        }
        <span>
          <button className="bg-orange text-black mr-4"><a className="font-medium text-black hover:underline" href='/quiz'>Retake Quiz</a></button>
          <button className="bg-orange text-black"><a className="font-medium text-black hover:underline" href='/majors'>View Majors</a></button>
        </span>
      </div>
  )
}


export default function Home() {

  // Index of current question
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // Array of objects with answer by user
  const [selectedOptions, setSelectedOptions] = useState([]);
  // Array of strings with the results
  const [results, setResults] = useState([]);

  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch('/api/questions')
      .then(res => res.json())
      .then(data => setQuestions(data.questions))
  }, [])

  const handleAnswerOption = (answer) => {
    setSelectedOptions(prev => {
      const newAnswers = [...prev];
      newAnswers[currentQuestion] = answer;
      return newAnswers;
    });
  };
  // console.log(questions)

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

  const calculateResults = () => {

    // Loop through the array of selectedOptions and find the corresponding matches
    let userMatches = []
    for (let i = 0; i < selectedOptions.length; i++) {
      const answerOption = questions[i].answerOptions.find((option) => option.answer === selectedOptions[i]);
      if (answerOption?.matches.length > 0)
        userMatches = [...userMatches, ...answerOption.matches]
    }

    // Now count the number of times each entry appears in the array. Uses lodash's countBy function
    const majorCounts = countBy(userMatches);

    // convert this object of (name, count) pairs into an array of {name, count} pairs, sorted in descdending order of count
    const pairs = Object.entries(majorCounts);

    // now sort the pairs
    pairs.sort((a, b) => b[1] - a[1]);

    // Now have an array of [name, count] pairs, sorted in descending order of count
    // Next combine this with the original array of major objects, so we can return the top 3 matches
    const newMatches = pairs.map((p) => ([p[0], p[1], majors.find((m) => m.shortcode === p[0])]));

    return newMatches
  };

  const handleSubmit = () => {
    let topMatches = calculateResults()
    setResults(topMatches)

    topMatches = topMatches.slice(0, 3)

    // Now we need to send the top 3 matches to the server to increment the count for each of them
    var shortCodesString = topMatches.map((match) => match[0]).join(',')

    // Do a POST request to the server to increment the count for each of the top 3 matches
    fetch('/api/majorcounts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ shortcodes: shortCodesString })
    })
      .then(res => res.json())
      // .then(data => console.log(data))
  };

  return (
    <main className="flex min-h-screen flex-col p-24 font-mono bg-white">
      <div>
        <h1 className="mb-3 text-xl font-bold text-center mt-10">Major Exploration Quiz</h1>
        <h2 className="mb-3 text-med text-center mt-10">This quiz will recommend 3 College of Engineering majors that you may be a good fit for!</h2>
        <h3 className="mb-3 text-med mt-10 px-40 text-center">Results will appear below after you submit the quiz. To edit quiz answers you can use the previous button then change the answer and submit again to get an updated result.</h3>
        <div className="flex flex-col mt-20 items-start w-full outline p-4 outline-orange/50 bg-orange/10">
          <h4 className="mt-10 text-med text-black">Question {currentQuestion + 1} of {questions.length}</h4>
          <div className="mt-4 text-l text-black">
            {questions[currentQuestion]?.question}
          </div>
          <div className="mt-4 text-l text-black">
            {questions[currentQuestion]?.answerOptions.map((option, i) => (
              <div key={i}>
                <input
                  type="radio"
                  id={`${currentQuestion}-${i}`}
                  name={`question-${currentQuestion}`}
                  onChange={(e) => handleAnswerOption(option.answer)}
                  checked={
                    option.answer === selectedOptions[currentQuestion]
                  }
                  value={option.answer}
                />
                <label htmlFor={`${currentQuestion}-${i}`}>{option.answer}</label>
              </div>
            ))}
          </div>
          <span>
            <button className="text-sm bg-orange text-black mr-4" onClick={handlePrevious}>Previous</button>
            {currentQuestion === questions.length - 1 ? (
              <button className="text-sm bg-orange text-black" onClick={handleSubmit}>Submit</button>
            ) : (
              <button className="text-sm bg-orange text-black" onClick={handleNext}>Next</button>
            )}
          </span>
        </div>
      </div>
      <ResultsView results={results} />
    </main>
  )
}