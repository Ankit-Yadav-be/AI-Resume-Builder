import React from "react";
import Header from "../components/custom/Header";
import {
  AiOutlineFileText,
  AiOutlineAppstoreAdd,
  AiOutlineDownload,
} from "react-icons/ai";
import SideBar from "./SideBar";

const Home = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-800 text-white">
      {/* Sidebar only for desktop */}
      <div className="hidden md:block md:w-1/4">
        <SideBar />
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full md:w-3/4 flex flex-col">
        {/* Header */}
        <div className="bg-white text-cyan-950 px-4 py-6 sm:px-8 sm:py-8 shadow-lg rounded-b-3xl">
          <Header />
        </div>

        {/* Main Body */}
        <section className="flex-1 px-4 sm:px-8 py-10 text-center flex flex-col items-center">
          {/* Intro Text */}
          <div className="space-y-4 max-w-2xl animate-fade-in text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-snug">
              Welcome to <span className="text-teal-300">AI Resume Builder</span>
            </h2>
            <p className="text-gray-300 text-base sm:text-lg">
              Create a stunning AI-powered resume and stand out in your next job application.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 w-full max-w-6xl px-2">
            {[
              {
                icon: (
                  <AiOutlineFileText className="text-6xl text-indigo-600 mb-4 hover:rotate-6 transition-transform duration-200" />
                ),
                title: "Create Resume",
                desc: "Generate a professional resume in minutes using AI.",
              },
              {
                icon: (
                  <AiOutlineAppstoreAdd className="text-6xl text-indigo-600 mb-4 hover:rotate-6 transition-transform duration-200" />
                ),
                title: "Choose Template",
                desc: "Pick a template, customize it, and make it yours.",
              },
              {
                icon: (
                  <AiOutlineDownload className="text-6xl text-indigo-600 mb-4 hover:rotate-6 transition-transform duration-200" />
                ),
                title: "Download Resume",
                desc: "Download your perfect resume or share it with a unique link.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white text-gray-800 p-6 sm:p-8 rounded-xl shadow-lg transform hover:scale-105 transition duration-300 text-left"
              >
                {feature.icon}
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-600 mt-2">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="mt-12">
            <button className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-400 hover:to-blue-500 text-white font-semibold px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300">
              Start Creating Now
            </button>
            <p className="text-sm text-gray-300 mt-4">
              Join thousands of job seekers who built their resume with AI.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
