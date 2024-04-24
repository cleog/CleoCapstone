'use client'

// import osuLogo from './osu-logo.jpg'
import Image from "next/image";
import osuLogo from './osu-logo2.png'
import Link from "next/link";


const Footer = () => {
    return (
        <footer className="w-full h-45 text-black bg-orange shadow grid grid-cols-3">
            <div className='col-start-1 col-span-1'>
                <Image src={osuLogo} alt="OSU Logo" width={250} height={210} />
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
        </footer >
    );
};
export default Footer;