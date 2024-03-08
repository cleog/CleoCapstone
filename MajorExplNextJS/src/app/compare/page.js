'use client'
import { useState } from 'react'
import majorsList from '../majors/majorsList.json'

export default function Compare() {
  const [selectedMajorName1, setSelectedMajorName1] = useState(majorsList[0].name)
  const [selectedMajorName2, setSelectedMajorName2] = useState(majorsList[0].name)
  const [selectedMajorName3, setSelectedMajorName3] = useState(majorsList[0].name)

  const onOptionChangeHandler1 = (event) => {
    setSelectedMajorName1(event.target.value);
  };

  const onOptionChangeHandler2 = (event) => {
    setSelectedMajorName2(event.target.value);
  };

  const onOptionChangeHandler3 = (event) => {
    setSelectedMajorName3(event.target.value);
  };

  const selectedMajorInfo1 = majorsList.find(m => m.name == selectedMajorName1)
  const selectedMajorInfo2 = majorsList.find(m => m.name == selectedMajorName2)
  const selectedMajorInfo3 = majorsList.find(m => m.name == selectedMajorName3)


  return (
    <main className="flex min-h-screen flex-col p-24 font-mono bg-orange/10 mb-16">

      <div className='flex flex-col items-center p-8' >
        <h1 className="mb-3 text-xl font-bold">Select 3 Majors to Compare:</h1>
      </div>

      {/* Grid with three columns */}
      <div className="grid lg:grid-cols-3 gap-x-10">

        {/* Left column */}
        <div className="lg:col-start-1 lg:col-span-1 leading-8 text-center outline p-4 outline-orange/50 bg-gradient-to-r from-orange/30 to-orange/10 divide-y divide-dashed divide-orange">
          <select name="majors" id="majorsDropdown1" onChange={onOptionChangeHandler1} className="items-center rounded-md bg-white px-1 py-2 mb-6 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            {majorsList.map(m => <option key={m.name} value={m.name}>{m.name}</option>)}
          </select>
          <div className='font-bold text-xl h-16'>
            {selectedMajorInfo1.name}
          </div>

          <div className='mt-4 leading-8 h-24'>
            <div className="font-bold">
              Campus:</div>
            {selectedMajorInfo1.campus}
          </div>

          <div className='mt-4 leading-8 h-16'>
            <div className="font-bold">
              Degrees Offered:
            </div>
            {selectedMajorInfo1.degreesOffered}
          </div>

          <div className='mt-4 leading-8 h-36'>
            <div className='font-bold'>Compatible Skills:</div>
            {selectedMajorInfo1.skillMatch}
          </div>

          <div className='mt-4 leading-8 h-56'>
            <div className='font-bold'>Math Requirements:</div>
            {selectedMajorInfo1.mathRequirements}
          </div>

          <div className='mt-4 leading-8 h-96'>
            <div className='font-bold'>Clubs and Organizations:</div>
            {selectedMajorInfo1.clubs}
          </div>

          <div className='mt-4 leading-8 h-32'>
            <div className='font-bold'>Minor Matches:</div>
            {selectedMajorInfo1.minorMatch}
          </div>

          <div className='leading-8 mt-4 h-28'>
            <div className='font-bold'>Undergraduate Enrollment Statistics (as of Fall 2022): </div>
            {selectedMajorInfo1.enrollment}
          </div>

          <div className='leading-8 mt-4 h-92'>
            <div className='font-bold'>Careers:</div>
            {selectedMajorInfo1.careers}
          </div>
        </div>

        {/* Middle Column */}
        <div className="lg:col-start-2 lg:col-span-1 leading-8 text-center outline p-4 outline-orange/50 bg-gradient-to-r from-orange/30 to-orange/10 divide-y divide-dashed divide-orange">
          <select name="majors" id="majorsDropdown2" onChange={onOptionChangeHandler2} className="mb-6 bg-white px-2 py-2 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            {majorsList.map(m => <option key={m.name} value={m.name}>{m.name}</option>)}
          </select>
          <div className='font-bold text-xl h-16'>
            {selectedMajorInfo2.name}
          </div>

          <div className='mt-4 leading-8 h-24'>
            <div className="font-bold">
              Campus:</div>
            {selectedMajorInfo2.campus}
          </div>

          <div className='mt-4 leading-8 h-16'>
            <div className="font-bold">
              Degrees Offered:
            </div>
            {selectedMajorInfo2.degreesOffered}
          </div>

          <div className='mt-4 leading-8 h-36'>
            <div className='font-bold'>Compatible Skills:</div>
            {selectedMajorInfo2.skillMatch}
          </div>

          <div className='mt-4 leading-8 h-56'>
            <div className='font-bold'>Math Requirements:</div>
            {selectedMajorInfo2.mathRequirements}
          </div>

          <div className='mt-4 leading-8 h-96'>
            <div className='font-bold'>Clubs and Organizations:</div>
            {selectedMajorInfo2.clubs}
          </div>

          <div className='mt-4 leading-8 h-32'>
            <div className='font-bold'>Minor Matches:</div>
            {selectedMajorInfo2.minorMatch}
          </div>

          <div className='leading-8 mt-4 h-28'>
            <div className='font-bold'>Undergraduate Enrollment Statistics (as of Fall 2022): </div>
            {selectedMajorInfo2.enrollment}
          </div>

          <div className='leading-8 mt-4 h-92'>
            <div className='font-bold'>Careers:</div>
            {selectedMajorInfo2.careers}
          </div>
        </div>

        {/* Right Column */}
        <div className='lg:col-start-3 lg:col-span-1 leading-8 outline p-4 text-center outline-orange/50 bg-gradient-to-r from-orange/10 to-orange/30 divide-y divide-dashed divide-orange'>
          <select name="majors" id="majorsDropdown3" onChange={onOptionChangeHandler3} className="mb-6 bg-white px-2 py-2 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            {majorsList.map(m => <option key={m.name} value={m.name}>{m.name}</option>)}
          </select>
          <div className='font-bold text-xl h-16'>
            {selectedMajorInfo3.name}
          </div>

          <div className='mt-4 leading-8 h-24'>
            <div className="font-bold">
              Campus:</div>
            {selectedMajorInfo3.campus}
          </div>

          <div className='mt-4 leading-8 h-16'>
            <div className="font-bold">
              Degrees Offered:
            </div>
            {selectedMajorInfo3.degreesOffered}
          </div>

          <div className='mt-4 leading-8 h-36'>
            <div className='font-bold'>Compatible Skills:</div>
            {selectedMajorInfo3.skillMatch}
          </div>

          <div className='mt-4 leading-8 h-56'>
            <div className='font-bold'>Math Requirements:</div>
            {selectedMajorInfo3.mathRequirements}
          </div>

          <div className='mt-4 leading-8 h-96'>
            <div className='font-bold'>Clubs and Organizations:</div>
            {selectedMajorInfo3.clubs}
          </div>

          <div className='mt-4 leading-8 h-32'>
            <div className='font-bold'>Minor Matches:</div>
            {selectedMajorInfo3.minorMatch}
          </div>

          <div className='leading-8 mt-4 h-28'>
            <div className='font-bold'>Undergraduate Enrollment Statistics (as of Fall 2022): </div>
            {selectedMajorInfo3.enrollment}
          </div>

          <div className='leading-8 mt-4 h-96'>
            <div className='font-bold'>Careers:</div>
            {selectedMajorInfo3.careers}
          </div>
        </div>
      </div>

    </main >
  )
}
