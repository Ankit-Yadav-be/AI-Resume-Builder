import React from "react";
import Header from "../components/custom/Header";
import { AiOutlineFileText, AiOutlineAppstoreAdd, AiOutlineDownload } from 'react-icons/ai';
import SideBar from "./SideBar";

const Home = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar Section */}
      <div className="w-1/4 bg-gradient-to-r from-indigo-800 via-purple-800 to-pink-800 text-white p-6 shadow-lg">
        <SideBar />
      </div>

      {/* Main Content Section */}
      <div className="w-3/4 flex flex-col bg-gradient-to-r from-indigo-800 via-purple-800 to-pink-800 text-white p-8">
        <div className="p-8 md:p-12 bg-white text-cyan-950 rounded-b-3xl shadow-xl mb-12">
          <Header />
        </div>

        <div className="flex flex-col items-center justify-center text-center p-12 space-y-12">
          {/* Welcome Section */}
          <div className="space-y-6">
            <h2 className="text-4xl font-extrabold text-gray-100 tracking-tight animate__animated animate__fadeIn">
              Welcome to AI Resume Builder
            </h2>
            <p className="text-lg text-gray-300 opacity-80">
              Create a stunning AI-powered resume and stand out in your next job application.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 w-full">
            
            {/* Resume Creation Section */}
            <div className="flex flex-col items-center space-y-4 p-10 rounded-lg bg-white shadow-xl hover:scale-105 transform transition-transform duration-300">
              <AiOutlineFileText className="text-6xl text-indigo-600 mb-4 transition-transform transform hover:rotate-6" />
              <h3 className="text-2xl font-semibold text-gray-800">Create Resume</h3>
              <p className="text-base text-gray-600">Generate a professional resume in minutes using AI.</p>
            </div>

            {/* Template Selection Section */}
            <div className="flex flex-col items-center space-y-4 p-10 rounded-lg bg-white shadow-xl hover:scale-105 transform transition-transform duration-300">
              <AiOutlineAppstoreAdd className="text-6xl text-indigo-600 mb-4 transition-transform transform hover:rotate-6" />
              <h3 className="text-2xl font-semibold text-gray-800">Choose Template</h3>
              <p className="text-base text-gray-600">Pick a template, customize it, and make it yours.</p>
            </div>

            {/* Resume Download Section */}
            <div className="flex flex-col items-center space-y-4 p-10 rounded-lg bg-white shadow-xl hover:scale-105 transform transition-transform duration-300">
              <AiOutlineDownload className="text-6xl text-indigo-600 mb-4 transition-transform transform hover:rotate-6" />
              <h3 className="text-2xl font-semibold text-gray-800">Download Resume</h3>
              <p className="text-base text-gray-600">Download your perfect resume or share it with your unique URL.</p>
            </div>

          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center space-y-6">
            <button className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-teal-400 hover:scale-105 transition-all duration-300 transform">
              Start Creating Now
            </button>
            <p className="text-gray-400 text-lg mt-4">
              Join thousands of job seekers who've crafted their dream resumes with AI.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
