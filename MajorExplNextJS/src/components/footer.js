'use client'

import osuLogo from './osu-logo.jpg'
import Image from "next/image";
import Link from "next/link";


const Footer = () => {
    return (
        <footer className="w-full h-40 text-black bg-orange/60 shadow grid grid-cols-3">
            <div className='col-start-1 col-span-1 mt-10 ml-12'>
                <Image src={osuLogo} alt="OSU Logo" width={165} height={165} />
            </div>
            <div className='col-start-2 col-span-1 text-center mt-4'>
                <h2 className='text-lg font-bold'>College of Engineering Majors Exploration Tool</h2>
                <h3 className='py-4'>Oregon State University Capstone Project by Cleo Golds</h3>
            </div>
            <div className='col-start-3 col-span-1 text-center mt-4'>
                <h3 className='font-bold mb-2'>College of Engineering Quick Links:</h3>
                <ul>
                    <li>
                        <Link href='https://engineering.oregonstate.edu/academics'>Academics Information</Link>
                    </li>
                    <li>
                        <Link href='https://engineering.oregonstate.edu/about'>About Information</Link>
                    </li>
                    <li>
                        <Link href='https://engineering.oregonstate.edu/research'>Research Information</Link>
                    </li>
                </ul>
            </div>
            {/* <div className='flex justify-center pt-2'>
                <h2>College of Engineering Majors Exploration Tool</h2>
            </div>
            <span classame='flex content-between'>
                <div>
                    <Image src={osuLogo} alt="OSU Logo" width={165} height={165} />
                </div>
                <div className>
                    <h3>College of Engineering Quick Links:</h3>
                    <ul>
                        <li>
                            <Link href='https://engineering.oregonstate.edu/academics'>Academics Information</Link>
                        </li>
                        <li>
                            <Link href='https://engineering.oregonstate.edu/about'>About Information</Link>
                        </li>
                        <li>
                            <Link href='https://engineering.oregonstate.edu/research'>Research Information</Link>
                        </li>
                    </ul>
                </div>
            </span>
            {/* add links on right side */}
            {/* <div className='flex justify-end mr-12'>
                <div>
                    <h3>College of Engineering Quick Links:</h3>
                </div> */}
                {/* <div>
                    <ul>
                        <li>
                            <Link href='https://engineering.oregonstate.edu/academics'>Academics Information</Link>
                        </li>
                        <li>
                            <Link href='https://engineering.oregonstate.edu/about'>About Information</Link>
                        </li>
                        <li>
                            <Link href='https://engineering.oregonstate.edu/research'>Research Information</Link>
                        </li>
                    </ul>
                </div> */}
            {/* </div>
            <div className='flex justify-center'>
                <h3>Oregon State University Capstone Project by Cleo Golds</h3>
            </div> */}
        </footer >
    );
};
export default Footer;