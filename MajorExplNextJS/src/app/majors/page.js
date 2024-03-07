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
    <main className="flex min-h-screen flex-col p-24 font-mono bg-orange/10">

      <div className='flex flex-col items-center p-8' >
        <div>
          <h1 className="mb-3 text xl font-semibold">Select a major:</h1>
        </div>

        <select name="majors" id="majorsDropdown" onChange={onOptionChangeHandler} className="w-1/3 inline-flex gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {majorsList.map(m => <option key={m.name} value={m.name}>{m.name}</option>)}
        </select>
        <button className="bg-orange text-white"><a className="text-sm text-white hover:underline" href="/compare">Start Comparison </a></button>
      </div>

      {/* Grid with two columns */}
      <div className="grid lg:grid-cols-2 gap-x-20">

        {/* Left Top Column */}
        <div className="lg:col-start-1 lg:col-span-1 lg:row-start-1 lg:text-med leading-8 text-gray-700 outline p-4 outline-orange/50 bg-gradient-to-r from-orange/30 to-orange/10">
          <div className='font-bold'>Major Description:</div>
          < br />
          {selectedMajorInfo.description}
        </div>

        {/* Left bottom column */}
        <div className="lg:col-start-1 lg:col-span-1 lg:row-start-2 text-med mt-8 leading-8 text-gray-700 outline p-4 outline-orange/50 bg-gradient-to-r from-orange/30 to-orange/10">
          <div className='font-bold mt-4'>Clubs and Organizations:</div>
          {selectedMajorInfo.clubs}

          <div className='font-bold mt-4'>Minor Matches:</div>
          {selectedMajorInfo.minorMatch}

          <div className='font-bold mt-4'>Undergraduate Enrollment Statistics (as of Fall 2022):</div>
          {selectedMajorInfo.enrollment}
        </div>

        {/* Right Top Column */}
        <div className="lg:col-start-2 lg:col-span-1 lg:row-start-1 outline p-4 outline-orange/50 bg-gradient-to-r from-orange/10 to-orange/30">

          <div className='mt-4 text-med leading-8 text-gray-700'>
            <div className="font-bold">
              Campus:</div>
            {selectedMajorInfo.campus}
          </div>
          <div className='mt-4 text-med leading-8 text-gray-700'>
            <div className="font-bold">
              Degrees Offered:
            </div>
            {selectedMajorInfo.degreesOffered}
          </div>
          <div className='mt-4 text-med leading-8 text-gray-700'>
            <div className='font-bold'>Compatible Skills:</div>
            {selectedMajorInfo.skillMatch}
          </div>
          <div className='mt-4 text-med leading-8 text-gray-700'>
            <div className='font-bold'>
              Math Requirements:
            </div>
            {selectedMajorInfo.mathRequirements}
          </div>
          <div className='mt-4 text-med leading-8 text-gray-700'>
            <div className='font-bold'>Hardest Classes: </div>
            {selectedMajorInfo.hardestClasses}
          </div>
          <div className='mt-4 text-xs leading-8 text-gray-700 flex justify-evenly'>
            <button className="bg-orange text-sm text-white"><a className="text-white hover:underline" href={selectedMajorInfo.samplePlan}>Sample 4-Year Schedule </a></button>
            <button className="bg-orange text-sm text-white"><a className="text-white hover:underline" href={selectedMajorInfo.extraInfo}>Schedule of Classes</a></button>
            <button className="bg-orange text-sm text-white"><a className="text-white hover:underline" href={"https://engineering.oregonstate.edu/tools-services/advising/transfer-student-guides"}>Transfer Guides</a></button>
          </div>
        </div>

        {/* Right Bottom Column */}
        <div className='lg:col-start-2 lg:col-span-1 lg:row-start-2 mt-8 outline p-4 outline-orange/50 bg-gradient-to-r from-orange/10 to-orange/30'>
          <div className='text-med leading-8 text-gray-700'>
            <div className='font-bold'>Careers:</div>
            {selectedMajorInfo.careers}
            <div className='mt-3.5 text-med leading-8 text-gray-700 italic mt-20'>
              <div className='font-bold'>Citations:</div>
              {selectedMajorInfo.citation}
            </div>
          </div>
        </div>
      </div>

    </main >
  )
}
