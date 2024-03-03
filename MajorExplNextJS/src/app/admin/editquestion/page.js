'use client'

import { add } from 'lodash';
import { useEffect, useState } from 'react';


export default function Home(parms) {

    const id = parms.searchParams.id

    const [question, setQuestion] = useState(undefined);

    const addAnswerHandler = () => {
        console.log("hi")
        setQuestion(prev => {
            const newAnswers = [...prev.answerOptions];
            newAnswers.push({ answer: "Answer goes here", matches: ["XX"] });
            return { ...prev, answerOptions: newAnswers }
        })
    }

    const addMatchHandler = (i) => {
        console.log("hi")
        setQuestion(prev => {
            const newMatches = [...prev.answerOptions[i].matches];
            newMatches.push("XX");
            const newAnswers = [...prev.answerOptions];
            newAnswers[i] = { ...prev.answerOptions[i], matches: newMatches }
            return { ...prev, answerOptions: newAnswers }
        })
    }

    // TODO: Just load the ONE question with the given id, instead of all of them
    useEffect(() => {
        fetch('http://localhost:3000/api/questions?id=' + id)
            .then(res => res.json())
            .then(data => setQuestion(data.questions[0]))
    }, []);

    if (question === undefined)
        return <main className="flex min-h-screen flex-col items-center font-mono p-24 bg-orange/10">Loading...</main>

    console.log(question)

    return <main className="flex min-h-screen flex-col items-center font-mono p-24 bg-orange/10">
        <h1 className="py-8 font-semibold text-2xl">Admin: Quiz Edit Page</h1>

        <form method="POST" action="/api/editquestion">
            <ul className="py-16">
                <div className="mb-8 outline p-4 outline-orange/50 bg-gradient-to-r from-orange/30 to-orange/1">
                    <li className="py-2 font-semibold text-xl">
                        <label htmlFor="question">Question:</label>
                    </li>
                    <li className="mb-8">
                        {/* This is the input field for the question with current text as default value */}
                        <textarea id="question" defaultValue={question.question} name="question" rows="4" cols="50" />
                    </li>
                </div>
                <li className="py-2 outline p-4 outline-orange/50 bg-gradient-to-r from-orange/30 to-orange/1 divide-y divide-dashed divide-black">
                    {question.answerOptions.map((a, i) => (
                        <div className="py-4" key={i}>
                            <li>
                                <span className='font-semibold text-xl'>Answer:</span>
                                <input type="text" className="w-60" defaultValue={String(a.answer)} />
                            </li>
                            <span className='font-semibold text-xl'>Matches:</span>
                            {a.matches.map(m => <input className="w-14" type="text" defaultValue={m} />)}
                            <button onClick={() => addMatchHandler(i)} className="bg-orange ml-8" type="button">Add Match</button>
                        </div>
                    ))}
                    <div className="py-8">
                        <span>
                            <button onClick={addAnswerHandler} className="bg-orange" type="button">Add Answer</button>
                            <button className="bg-orange ml-8" type="submit">Submit</button>
                        </span>
                    </div>
                </li>
            </ul>
        </form>
    </main>
}
