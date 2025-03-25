import React, {useEffect, useState} from "react";
import { Menu, X } from "lucide-react"; //Import icons for menu toggle
import axiosApi from "../utils/axiosApi.js";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Navbar = () => {
  const [isMenuOpne, setIsMenuOpne] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axiosApi.get("/users/check-auth", {withCredentials: true});
        if (response.status === 200) {
          setIsAuthenticated(true);
          // console.log("Response in navbar is: ", response)
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, [isAuthenticated])
  
  // logout function
  const handleLogout = async () => {
    try {
      const response = await axiosApi.post("/users/logout", {}, {withCredentials: true});
      if (response.status === 200) {
        setIsAuthenticated(false);
        navigate("/login");
        toast.warn("User logged out successfully!!!", {
          position: "top-right",
          autoClose: 2000,
          theme: "dark",
        });
      }
    } catch (error) {
      console.error("Logout failed", error.response || error);
    }
  };

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
          </button>
        </div>
        {/* Navigation links hidden on small screen */}
        <ul className={`md:flex md:items-center md:gap-4 ${isMenuOpne ? "block": "hidden"} absolute md:static bg-slate-800 w-full md:w-auto left-0 top-16 p-4 md:p-0`}>
          <li className="flex gap-4">
            <a className="hover:font-bold" href="/">
              Home
            </a>
            <a className="hover:font-bold" href="/add-password">
              Your Passowrds
            </a>
            <a className="hover:font-bold" href="#">
              About
            </a>
            {!isAuthenticated && (
              <>
                <a className="hover:font-bold" href="/signup">
                  SignUp
                </a>
                <a className="hover:font-bold" href="/login">
                  Sign In
                </a>
              </>
            )}
            {/* show only when the user is authenticated */}
            {isAuthenticated && (
              <button onClick={handleLogout} className="hover:font-bold cursor-pointer">
              Logout
            </button>
            )}
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
      <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
    </nav>
  );
};

export default Navbar;
