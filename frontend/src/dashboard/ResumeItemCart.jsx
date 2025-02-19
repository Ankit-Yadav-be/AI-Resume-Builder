import { Notebook } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const ResumeItemCart = ({ resume }) => {
  const { userResumeTitle } = resume;
  const { userResumeId } = resume;
  return (
    <Link to={"/dashboard/resume/" + userResumeId + "/edit"}>
      <div
        className="relative max-w-sm mx-auto ml-10 h-[310px] bg-white bg-opacity-90 shadow-2xl rounded-2xl p-8 overflow-hidden 
             border border-gray-300 backdrop-filter backdrop-blur-lg hover:shadow-2xl transition-all duration-300 dark:bg-gray-900 dark:border-gray-700"
      >
        {/* Ribbon Label */}
        <span
          className="absolute top-0 left-0 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-semibold
               px-4 py-1 rounded-br-lg shadow-md"
        >
          Featured
        </span>

        {/* Gradient Border with Glow Effect */}
        <span
          className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-indigo-500 to-pink-500
               opacity-40 hover:opacity-100 transition-opacity duration-500"
        ></span>

        {/* Content */}
        <div className="relative z-10 h-[270] w-[150]">
          {/* Icon Section with Animation */}
          <div
            className="flex items-center justify-center h-16 w-16 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 
                 text-white rounded-full shadow-lg mb-6 transform hover:scale-50 transition-transform duration-300"
          >
            <Notebook className="w-8 h-8 animate-bounce" />
          </div>

          {/* Divider */}
          <div className="border-t border-gray-300 dark:border-gray-600 my-6"></div>

          {/* User Resume Title */}
          <div className="mt-4">
            <p className="text-center text-xl font-bold text-gray-900 dark:text-white tracking-wide leading-tight">
              {userResumeTitle}
            </p>
          </div>

          {/* Button Section */}
          <div className="mt-6 text-center">
            <button
              className="px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-md
                   shadow-lg hover:from-green-500 hover:to-blue-600 transition-all duration-300"
            >
              View Resume
            </button>
          </div>

          {/* Social Icons */}
          <div className="mt-6 flex justify-center space-x-4">
            <a
              href="#"
              className="text-blue-500 hover:text-blue-700 transition duration-300"
            >
              <i className="fab fa-linkedin fa-2x"></i>
            </a>
            <a
              href="#"
              className="text-gray-800 hover:text-gray-900 transition duration-300"
            >
              <i className="fab fa-github fa-2x"></i>
            </a>
            <a
              href="#"
              className="text-pink-500 hover:text-pink-600 transition duration-300"
            >
              <i className="fab fa-dribbble fa-2x"></i>
            </a>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ResumeItemCart;
