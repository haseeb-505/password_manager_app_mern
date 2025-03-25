import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import axiosApi from "../utils/axiosApi.js";
import Navbar from "./Navbar.jsx";

const Register = () => {

    const [formData, setFormData] = useState({username: "", email: "", fullName: "", password: ""});
    const navigate = useNavigate();

    const handleChange = (e) => {
        // e.preventDefault();
        setFormData({...formData, [e.target.name]: e.target.value});

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosApi.post('users/register', 
                formData, 
                {headers: { "Content-Type" : "application/json"}}
            );
            if (response.data.success) {
                console.log("form data is submitted", response.data)
                toast.success(`${response.data.message}`, {
                        position: "top-right",
                        autoClose: 2000,
                        theme: "dark",
                      });
            } else{
                console.error("Ran into error: ", response.data.message)
                toast.error(`${response.data.message}`, {
                    position: "top-right",
                    autoClose: 2000,
                    theme: "dark",
                  });
            }
        } catch (error) {
            if (error.response) {
                console.error("Server Error: ", error.response.data.message);
                toast.error(`Error: ${error.response.data.message}`, {
                        position: "top-right",
                        autoClose: 2000,
                        theme: "dark",
                      });
            } else{
                console.error("Network or Unexpected Error: ", error.message)
                toast.warn(`Error: ${error.message}`, {
                    position: "top-right",
                    autoClose: 2000,
                    theme: "dark",
                  });
            }
        }
        // clear the form data
        // setFormData({...formData, [e.target.name]: ""});
        setFormData({username: "", email: "", fullName: "", password: ""});
        // navigate to login page
        setTimeout(() => {
            navigate("/login");
          }, 3000)
    };

    
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar/>
      <section className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        {/* registration form */}
        <div className="w-full bg-white rounded-lg shadow dark:border mt-12 md:mt-12 lg:mt-20 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-1 md:space-y-1 sm:p-4">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            {/* form here */}
            <form className="space-y-2 md:space-y-3" onSubmit={handleSubmit}>
              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1.5 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              {/* username input */}
              <div>
                <label
                  htmlFor="username"
                  className="block mb-1.5 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              {/* fullName Input */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block mb-1.5 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  id="fullName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Full Name..."
                  required
                />
              </div>
              {/* password Input */}
              <div>
                <label
                  htmlFor="password"
                  className="block mb-1.5 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              {/* Terms and Conditions Checkbox */}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{" "}
                    <a
                      href="#"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full cursor-pointer text-white bg-blue-700 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Submit to Sign Up
              </button>
              {/* Login Link */}
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
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
    </div>
  );
};

export default Register;
