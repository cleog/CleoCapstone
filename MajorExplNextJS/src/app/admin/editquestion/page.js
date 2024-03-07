'use client'

import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// TODO: Grey out Submit button if no changes have been made. 
//       This will require a copy of the original question object to compare against.


// This is a helper function to add unique IDs to the unstable fields in the question object:
//   It is needed to augment the answer options with unique IDs for the unstable fields
//   It modifies the structure in-place and returns the modified object
function addUuidsToAnswers(question) {
    // Iterate through each answer option
    question.answerOptions.forEach(answerOption => {
        // Assign a unique ID to the answer
        answerOption.field_id = uuidv4();

        // Check if matches exist and are an array
        if (Array.isArray(answerOption.matches) && answerOption.matches.length) {
            // Iterate through each match in the answer and assign a unique ID
            answerOption.matches = answerOption.matches.map(match => ({
                field_id: uuidv4(),
                value: match
            }));
        }
    });

    return question; // Return the modified question object

    // Example question object answerOptions objects after the function is called:
    // answerOptions: [
    //  {
    //   answer: "Yes!!"
    //   field_id: "1875efb5-b489-4d71-b56d-c66ee1c5f794"       // ADDED
    //   matches:[
    //     {field_id: "3726826a-446f-4bc5-b535-6852be740506", value: "RHP"}     // field change to object with field_id and value
    //     {field_id: "c410dc32-c304-4e28-9a27-a80beafdd3ad", value: "BE"}      // field change to object with field_id and value
    //   ]
    //  }
    // ...
}

// This is needed to remove the augmented field_ids for the unstable fields so it can be saved in DB
//   It modifies the structure in-place and returns the modified object
//   It is the inverse of the addUuidsToAnswers() function
function removeUuidsFromAnswers(question) {
    // Iterate through each answer option
    question.answerOptions = question.answerOptions.map(answerOption => {
        // If 'matches' exists and is an array, transform it back into an array of strings
        const matches = Array.isArray(answerOption.matches) ? answerOption.matches.map(match => match.value) : [];

        // Return a new answerOption object without the 'field_id' and with the transformed 'matches'
        return {
            ...answerOption,
            matches,
            // Exclude the field_id property from the result
        };
    }).map(({ field_id, ...rest }) => rest); // Exclude the field_id from the answerOptions objects

    return question; // Return the modified question object
}


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
            newMatches[matchIndex].value = val;
            const newAnswers = [...prev.answerOptions];
            newAnswers[answerIndex] = { ...prev.answerOptions[answerIndex], matches: newMatches }
            return { ...prev, answerOptions: newAnswers }
        })
    }

    const addAnswerHandler = () => {
        setQuestion(prev => {
            const newAnswers = [...prev.answerOptions];
            newAnswers.push({ answer: "Answer goes here", matches: [], field_id: uuidv4()});
            return { ...prev, answerOptions: newAnswers }
        })
    }

    const addMatchHandler = (i) => {
        setQuestion(prev => {
            const newMatches = [...prev.answerOptions[i].matches];
            newMatches.push({ value: "XX", field_id: uuidv4() });
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
    
    const handleSubmitHandler = async (e) => {
        e.preventDefault();
        // We need to remove those field_ids before sending to the server
        const questionWithoutFieldIds = removeUuidsFromAnswers({...question}); // Pass in a copy of the question object so we don't damage the one we are using with React
        // issue a HTTP PUT to the /api/questions endpoint with the question object as the body
        const result = await fetch('http://localhost:3000/api/questions', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(questionWithoutFieldIds)    
        })
        const resultData = await result.json()
        if (resultData.modifiedCount === 1) 
            alert("Question saved successfully")
        else 
            alert("Question save failed: " + JSON.stringify(resultData))
    }

    useEffect(() => {
        fetch('http://localhost:3000/api/questions?id=' + id)
            .then(res => res.json())
            .then(data => setQuestion(addUuidsToAnswers(data.questions[0])))
    }, [id]);

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
                        <div className="py-4" key={a.field_id}>
                            <li>
                                {/* Answer */}
                                <span className='font-semibold text-xl'>Answer:</span>
                                <input type="text" className="w-60" value={String(a.answer)} onChange={(e) => answerValueHandler(ai, e.target.value)}/>
                                <button className="bg-red-500 p-1 text-sm" type="button" onClick={() => deleteAnswerHandler(ai)}>Delete Answer</button>
                            </li>

                            {/* Matches */}
                            <span className='font-semibold text-xl'>Matches:</span>
                            {a.matches.map((m, mi) => <span key={m.field_id}>
                                <input className="w-14" type="text" defaultValue={m.value} onChange={(e) => matchValueHandler(ai, mi, e.target.value)}/>
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
