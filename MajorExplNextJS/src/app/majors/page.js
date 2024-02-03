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

        {/* Left Column */}
        <div className="lg:col-start-1 lg:col-span-1 lg:row-start-1 text-xl leading-8 text-gray-700 outline p-4 outline-orange/50 bg-orange/20">
          <div className='font-bold'>Description:</div>
          {selectedMajorInfo.description}
        </div>

        {/* Right Column */}
        <div className="lg:col-start-2 lg:col-span-1 lg:row-start-1 outline p-4 outline-orange/50 bg-orange/20">

          {/* Campus */}
          <div className='text-xl leading-8 text-gray-700'>
            <div className="font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 inline">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              &nbsp;Campus:</div>
            {selectedMajorInfo.campus}
          </div>

          <div className='mt-4 text-xl leading-8 text-gray-700'>
            <div className="font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-8 inline" >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
              </svg>
              &nbsp;Degrees Offered: </div>
            {selectedMajorInfo.degreesOffered}
            {/* </div> */}
          </div>
          <div className='mt-4 text-xl leading-8 text-gray-700'>
            <div className='font-bold'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 inline">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z" />
              </svg>

              &nbsp;Math Requirements: </div>
            {selectedMajorInfo.mathRequirements}
          </div>
          <div className='mt-6 text-xl leading-8 text-gray-700'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 inline">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
            </svg>


            &nbsp;<a className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href={selectedMajorInfo.samplePlan}>Sample 4-Year Schedule </a>
          </div>
          <div className='mt-6 text-xl leading-8 text-gray-700 italic mt-20'>
            <div> Citations: </div>
            {selectedMajorInfo.citation}
          </div>
        </div>
      </div>


    </main >
  )
}
