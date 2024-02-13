'use client'

import { useState } from 'react'
import majorsList from './majorsList.json'



// https://www.geeksforgeeks.org/how-to-use-html-select-tag-in-reactjs/



export default function Home() {

  const [selectedMajorName, setSelectedMajorName] = useState(majorsList[0].name)

  const onOptionChangeHandler = (event) => {
    setSelectedMajorName(event.target.value);
  };

  const selectedMajorInfo = majorsList.find(m => m.name == selectedMajorName)

  return (
    <main className="flex min-h-screen flex-col p-24">

      <div className='flex flex-col items-center p-8' >
        <div>
          <h1 className="mb-3 text-2xl font-semibold">Select a major:</h1>
        </div>

        <select name="majors" id="majorsDropdown" onChange={onOptionChangeHandler} className="w-1/4 inline-flex gap-x-1.5 rounded-md bg-white px-3 py-2 text-lg font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {majorsList.map(m => <option key={m.name} value={m.name}>{m.name}</option>)}
        </select>
      </div>

      {/* Grid with two columns */}
      <div className="grid lg:grid-cols-2 gap-x-20">

        {/* Left Top Column */}
        <div className="lg:col-start-1 lg:col-span-1 lg:row-start-1 lg:text-xl leading-8 text-gray-700 outline p-4 outline-orange/50 bg-gradient-to-r from-orange/30 to-orange/10">
          <div className='font-bold'>Description:</div>
          {selectedMajorInfo.description}
        </div>

        {/* Left bottom column */}
        <div className="lg:col-start-1 lg:col-span-1 lg:row-start-2 text-xl mt-8 leading-8 text-gray-700 outline p-4 outline-orange/50 bg-gradient-to-r from-orange/30 to-orange/10">
          <div className='font-bold'>Clubs and Organizations:</div>
          {selectedMajorInfo.clubs}
          {/* TODO: make this a list */}

          <div className='font-bold mt-8'>Compatible Skills:</div>
          {selectedMajorInfo.skillMatch}

          <div className='font-bold mt-8'>Undergraduate Enrollment Statistics (as of Fall 2022):</div>
          {selectedMajorInfo.enrollment}
        </div>

        {/* Right Top Column */}
        <div className="lg:col-start-2 lg:col-span-1 lg:row-start-1 outline p-4 outline-orange/50 bg-gradient-to-r from-orange/10 to-orange/30">

          {/* Campus */}
          <div className='text-xl leading-8 text-gray-700'>
            <div className="font-bold">
              &nbsp;Campus:</div>
            {selectedMajorInfo.campus}
          </div>

          <div className='mt-4 text-xl leading-8 text-gray-700'>
            <div className="font-bold">
              Degrees Offered:
            </div>
            {selectedMajorInfo.degreesOffered}
            {/* </div> */}
          </div>
          <div className='mt-4 text-xl leading-8 text-gray-700'>
            <div className='font-bold'>
              Math Requirements:
            </div>
            {selectedMajorInfo.mathRequirements}
          </div>
          <div className='mt-6 text-xl leading-8 text-gray-700'>
            <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href={selectedMajorInfo.samplePlan}>Sample 4-Year Schedule </a>
          </div>
          <div className='mt-4 text-xl leading-8 text-gray-700'>
            <div className='font-bold'>Hardest Classes: </div>
            {selectedMajorInfo.hardestClasses}
            {/* TODO: make this a double list */}
          </div>
        </div>

        {/* Right Bottom Column */}
        <div className='lg:col-start-2 lg:col-span-1 lg:row-start-2 mt-8 outline p-4 outline-orange/50 bg-gradient-to-r from-orange/10 to-orange/30'>
          <div className='text-xl leading-8 text-gray-700'>
            <div className='font-bold'>Careers:</div>
            {selectedMajorInfo.careers}
          </div>
          <div className='mt-6 text-xl leading-8 text-gray-700 italic mt-20'>
            <div className='font-bold'>Citations:</div>
            {selectedMajorInfo.citation}

          </div>
        </div>
      </div>

    </main >
  )
}
