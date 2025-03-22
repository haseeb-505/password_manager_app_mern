import React, {useState} from "react";
import { Menu, X } from "lucide-react"; //Import icons for menu toggle

const Navbar = () => {
  const [isMenuOpne, setIsMenuOpne] = useState(false);


  return (
    <nav className="bg-slate-800 text-white fixed top-0 w-full">
      <div className="myContainer flex justify-between items-center px-4 py-5 h-16">
        <div className="logo font-bold text-xl md:text-2xl">
            <span className="text-green-700">&lt;</span>
            Pass
            <span className="text-green-700">OP/&gt;</span>
        </div>
        {/* menu for small screens */}
        <div className="md:hidden">
          <button onClick={()=> setIsMenuOpne(!isMenuOpne)} className="text-white focus:outline-none cursor-pointer active:bg-green-800">
            {isMenuOpne ? <X size={32}/> : <Menu size={32}/>}
            {/* <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg> */}
          </button>
        </div>
        {/* Navigation links hidden on small screen */}
        <ul className={`md:flex md:items-center md:gap-4 ${isMenuOpne ? "block": "hidden"} absolute md:static bg-slate-800 w-full md:w-auto left-0 top-16 p-4 md:p-0`}>
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
          <img className="invert w-10" src={`${import.meta.env.BASE_URL}/icons/github-icon-svg.svg`} onError={(e)=>(e.currentTarget.src="/icons/github-icon-svg.svg")} alt="github_logo"/>
          <span className="font-bold hidden md:block">GitHub</span>
          
        </button>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
