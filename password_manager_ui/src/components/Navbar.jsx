import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white fixed top-0 w-full">
      <div className="myContainer flex justify-between items-center px-4 py-5 h-16">
        <div className="logo font-bold text-2xl">
            <span className="text-green-700">&lt;</span>
            Pass
            <span className="text-green-700">OP/&gt;</span>
        </div>
        <ul>
          <li className="flex gap-4">
            <a className="hover:font-bold" href="#">
              Home
            </a>
            <a className="hover:font-bold" href="#">
              Contact
            </a>
            <a className="hover:font-bold" href="#">
              About
            </a>
            <a className="hover:font-bold" href="#">
              SignUp
            </a>
            <a className="hover:font-bold" href="#">
              Sign In
            </a>
          </li>
        </ul>
        {/* github icon */}
        <a href="https://github.com/haseeb-505" target="_blank">
        <button className="text-white rounded-full h-12 px-1 flex gap-1 justify-between items-center bg-green-700 cursor-pointer">
          <img className="invert w-10" src="/icons/github-icon-svg.svg" alt="github_logo"/>
          <span className="font-bold">GitHub</span>
          
        </button>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
