'use client'

// TODO: Add validation for the question object - look at a lib like zod or yup

import { useEffect, useState } from 'react';
import Link from 'next/link';


export default function Home(parms) {
    const [majorsList, setMajorsList] = useState([]);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    async function deleteQuestionHandler(id) {
        const result = await fetch('/api/questions?id=' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        setRefreshTrigger(prev => (prev + 1))
        return result
    }

    async function addQuestionHandler() {
        const newQuestion = {
            question: 'What is your favorite color?',
            group: 999,
            answerOptions: [
                { answer: 'Red', matches: ['AA', 'BB'] },
                { answer: 'Blue', matches: ['CC', 'DD'] },
            ]
        }
        const result = await fetch('/api/questions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newQuestion)
        })
        setRefreshTrigger(prev => (prev + 1))
        return result
    }


    useEffect(() => {
        import('../majors/majorsList.json')
            .then((module) => {
                setMajorsList(module.default);
            })
            .catch((error) => {
                console.error('Failed to load majorsList:', error);
            });
    }, [refreshTrigger]);

    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        fetch('/api/questions')
            .then(res => res.json())
            .then(data => setQuestions(data.questions))
    }, [refreshTrigger]);

    const [majorCounts, setMajorCounts] = useState([]);
    // Get majorcounts from database
    useEffect(() => {
        fetch('/api/majorcounts')
            .then((res) => res.json())
            .then((data) => {
                setMajorCounts(data);
            });
    }, [refreshTrigger]); // TODO: Add a dependency array so we know when to call the API again when a count is updated? or just tell user to hit Refresh button

    function getCountForMajorShortcode(shortcode) {
        if (majorCounts.length === 0)
            return '...'
        const majorCount = majorCounts.counts.find((major) => major.shortcode === shortcode);
        return majorCount ? majorCount.count : 0;
    }


    return (
        <main className="flex min-h-screen flex-col items-center font-mono p-24 bg-orange/10">
            <h2 className='text-3xl mb-8 font-semibold'>Admin View</h2>
            <h3 className='text-2xl font-semibold py-8'>Major Result Frequency:</h3>
            <div className="flex justify-center leading-8 text-gray-700 p-4">
                <table>
                    <thead>
                        <tr>
                            <th className='text-xl border border-1 border-orange bg-orange/20'>Major</th>
                            <th className='text-xl border border-1 border-orange bg-orange/20'>Frequency</th>
                        </tr>
                    </thead>
                    <tbody>
                        {majorsList.map((major) => (
                            <tr key={major.name}>
                                <td className='text-lg px-2 py-4 border border-1 border-orange'>{major.name}</td>
                                <td className='text-lg px-2 py-4 border border-1 border-orange'>{getCountForMajorShortcode(major.shortcode)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <h3 className='text-2xl font-semibold py-8'>Edit Quiz:</h3>
            <div className="leading-8 text-gray-700 p-4">
                <table className="text-center">
                    <thead>
                        <tr>
                            <th className='text-xl border border-1 border-orange bg-orange/20'>Question</th>
                            <th className='text-xl border border-1 border-orange bg-orange/20'>Answers</th>
                            <th className='text-xl border border-1 border-orange bg-orange/20'>Matches</th>
                            <th className='text-xl border border-1 border-orange bg-orange/20'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questions.map((questionName) => (
                            <tr key={questionName.question}>
                                <td className='text-lg border border-1 border-orange p-2'>{questionName.question}</td>
                                <td className='text-lg border border-1 border-orange p-2'>
                                    {questionName.answerOptions.map((answerOption) => (
                                        <span key={answerOption.answer}>- {answerOption.answer}<br /></span>
                                    ))}
                                </td>
                                <td className='text-lg border border-1 border-orange p-2'>
                                    {questionName.answerOptions.map((match) => (
                                        <span key={match.matches}>- {match.matches.join(', ')}<br /></span>
                                    ))}
                                </td>
                                <td className='text-lg border border-1 border-orange p-2'>
                                    <Link className='hover:underline' href={`./admin/editquestion?id=${questionName._id}`}>Edit</Link>
                                    &nbsp;
                                    <Link className='hover:underline' href="#" onClick={() => deleteQuestionHandler(questionName._id)}>Delete</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className='bg-orange/50 p-2 rounded-md hover:bg-orange/70' onClick={addQuestionHandler}>Add Question</button>
            </div>
        </main>
    )
}