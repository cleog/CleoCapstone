'use client'

// CITE: Modified from code in https://dev.to/ryaddev/creating-a-responsive-navbar-using-nextjs-and-tailwind-css-48kk 
import Link from "next/link";
import Image from "next/image";
import osuLogo from './osu-logo.jpg'
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
    const [nav, setNav] = useState(false);

  const links = [
    {
      id: 1,
      link: "/",
      label: "home",
    },
    {
      id: 2,
      link: "about",
      label: "about",
    },
    {
      id: 3,
      link: "majors",
      label: "Majors",
    },
    {
      id: 4,
      link: "quiz",
      label: "Quiz",
    },
  ];

  return (
    <div className="flex justify-between items-center w-full h-20 px-4 text-white bg-orange fixed nav">
      <div>
        {/* <h1 className="text-5xl font-signature ml-2"><a className="link-underline hover:transition ease-in-out delay-150 hover:underline hover:decoration-solid" href="">Logo</a></h1> */}
        <h1 className="text-5xl font-signature ml-2">
          <a
            className="link-underline link-underline-black"
            href=""
            target="_blank"
            rel="noreferrer"
          >
            <Image src={osuLogo} alt="OSU Logo" width={180} height={180} />
          </a>
        </h1>
      </div>

    <div>
      <h1 className="text-black text-xl items-center">CoE Majors Exploration Tool</h1>
    </div>

      <ul className="hidden md:flex">
        {links.map(({ id, link, label }) => (
          <li
            key={id}
            className="nav-links px-5 cursor-pointer capitalize text-xl text-black hover:scale-105 hover:text-white duration-200 link-underline"
          >
            <Link href={link}>{label}</Link>
          </li>
        ))}
      </ul>

      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
      >
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {nav && (
        <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500">
          {links.map(({ id, link }) => (
            <li
              key={id}
              className="px-4 cursor-pointer capitalize py-6 text-4xl"
            >
              <Link onClick={() => setNav(!nav)} href={link}>
                {link}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Navbar;