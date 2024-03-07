'use client'

import { useEffect, useState } from 'react';

//TODO: Handlers for when the actual values are edited
//TODO: Handlers for submit 



export default function Home(parms) {

    const id = parms.searchParams.id

    const [question, setQuestion] = useState(undefined);

    const questionValueHandler = (e) => {
        setQuestion(prev => {
            return { ...prev, question: e.target.value }
        })
    }

    const groupValueHandler = (e) => {
        const newval = parseInt(e.target.value, 10) || 0     // Watch out for NaN!
        setQuestion(prev => {
            return { ...prev, group: newval }
        })
    }

    const answerValueHandler = (index, val) => {
        setQuestion(prev => {
            const newAnswers = [...prev.answerOptions];
            newAnswers[index] = { ...prev.answerOptions[index], answer: val }
            return { ...prev, answerOptions: newAnswers }
        })
    }

    const matchValueHandler = (answerIndex, matchIndex, val) => {
        setQuestion(prev => {
            const newMatches = [...prev.answerOptions[answerIndex].matches];
            newMatches[matchIndex] = val;
            const newAnswers = [...prev.answerOptions];
            newAnswers[answerIndex] = { ...prev.answerOptions[answerIndex], matches: newMatches }
            return { ...prev, answerOptions: newAnswers }
        })
    }

    const addAnswerHandler = () => {
        setQuestion(prev => {
            const newAnswers = [...prev.answerOptions];
            newAnswers.push({ answer: "Answer goes here", matches: ["XX"] });
            return { ...prev, answerOptions: newAnswers }
        })
    }

    const addMatchHandler = (i) => {
        setQuestion(prev => {
            const newMatches = [...prev.answerOptions[i].matches];
            newMatches.push("XX");
            const newAnswers = [...prev.answerOptions];
            newAnswers[i] = { ...prev.answerOptions[i], matches: newMatches }
            return { ...prev, answerOptions: newAnswers }
        })
    }

    const deleteMatchHandler = (answerIndex, matchIndex) => {
        // Delete this match from the array
        setQuestion(prev => {
            const newMatches = prev.answerOptions[answerIndex].matches.filter((m, i) => i !== matchIndex);
            const newAnswers = [...prev.answerOptions];
            newAnswers[answerIndex] = { ...prev.answerOptions[answerIndex], matches: newMatches }
            return { ...prev, answerOptions: newAnswers }
        })
    }

    const deleteAnswerHandler = (answerIndex) => {
        // Delete this answer from the array
        setQuestion(prev => {
            const newAnswers = prev.answerOptions.filter((a, i) => i !== answerIndex);
            return { ...prev, answerOptions: newAnswers }
        })
    }
    
    const handleSubmitHandler = (e) => {
        alert("Next week I write the submit code :)")
        e.preventDefault();
    }

    useEffect(() => {
        fetch('http://localhost:3000/api/questions?id=' + id)
            .then(res => res.json())
            .then(data => setQuestion(data.questions[0]))
    }, []);

    if (question === undefined)
        return <main className="flex min-h-screen flex-col items-center font-mono p-24 bg-orange/10">Loading...</main>

    console.log(question)

    return <main className="flex min-h-screen flex-col items-center font-mono p-24 bg-orange/10">
        <h1 className="py-4 font-semibold text-2xl">Admin: Quiz Edit Page</h1>

        <form method="POST" action="/api/editquestion">
            <ul className="py-8">

                {/* Question */}
                <span className='font-semibold text-xl'>Edit Question:</span>
                <div className="mb-8 outline p-4 outline-orange/50 bg-gradient-to-r from-orange/30 to-orange/1 mt-4">
                    <li className="mb-4 mt-4">
                        {/* This is the input field for the question with current text as default value */}
                        <textarea id="question" value={question.question} name="question" rows="4" cols="75" required onChange={questionValueHandler}/>
                    </li>
                </div>
                
                {/* Group */}
                <span className='font-semibold text-xl'>Group Index:</span><small>(Questions are presented to user in order based on this number - does not need to be unique)</small>
                <div className="mb-8 outline p-4 outline-orange/50 bg-gradient-to-r from-orange/30 to-orange/1 mt-4">
                    <li className="mb-4 mt-4">
                        {/* This is the input field for the group with current text as default value */}
                        <input type="text" className="w-20" id="group" value={question.group} name="group" onChange={groupValueHandler}/>
                    </li>
                </div>

                <span className='font-semibold text-xl'>Edit Answers:</span>
                <li className="py-2 outline p-4 outline-orange/50 bg-gradient-to-r from-orange/30 to-orange/1 divide-y divide-dashed divide-black mt-4">
                    {question.answerOptions.map((a, ai) => (
                        <div className="py-4" key={a.answer}>
                            <li>
                                {/* Answer */}
                                <span className='font-semibold text-xl'>Answer:</span>
                                <input type="text" className="w-60" value={String(a.answer)} onChange={(e) => answerValueHandler(ai, e.target.value)}/>
                                <button className="bg-red-500 p-1 text-sm" type="button" onClick={() => deleteAnswerHandler(ai)}>Delete Answer</button>
                            </li>

                            {/* Matches */}
                            <span className='font-semibold text-xl'>Matches:</span>
                            {a.matches.map((m, mi) => <span key={m}>
                                <input className="w-14" type="text" defaultValue={m} onChange={(e) => matchValueHandler(ai, mi, e.target.value)}/>
                                <button className="bg-red-500 mr-4 p-1 text-sm" type="button" onClick={() => deleteMatchHandler(ai, mi)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                    </svg>

                                </button>
                            </span>)}
                            <button onClick={() => addMatchHandler(ai)} className="bg-orange p-1 ml-4 text-m" type="button">Add</button>
                        </div>
                    ))}
                    <div className="py-8">
                        <span>
                            <button onClick={addAnswerHandler} className="bg-orange" type="button">Add Answer</button>
                            <button className="bg-orange ml-8" type="button" onClick={handleSubmitHandler}>Submit</button>
                        </span>
                    </div>
                </li>
            </ul>
        </form>
    </main>
}
