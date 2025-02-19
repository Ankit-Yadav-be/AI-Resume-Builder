import React, { useEffect, useState } from 'react';
import AddResume from './components/AddResume';
import { useUser } from '@clerk/clerk-react';
import ResumeItemCart from './ResumeItemCart.jsx';
import axios from 'axios';

const Dashboard = () => {
  const [resumeList, setResumeList] = useState([]);
  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  useEffect(() => {
    if (userEmail) {
      fetchResumes(userEmail);
    }
  }, [userEmail]); // Dependency is userEmail to track changes properly.

  const fetchResumes = async (email) => {
    try {
      const response = await axios.get("https://ai-resume-builder-7yb4.onrender.com/api/v1/resume-list", {
        params: { userEmail: email },
      });
      setResumeList(response.data.resumes);
    } catch (error) {
      console.error("Error fetching resumes:", error);
      alert(error.response?.data?.message || "Failed to fetch resumes.");
    }
  };

  return (
    <div className="p-10 md:px-10 lg:px-32 bg-gradient-to-r from-gray-50 to-white rounded-xl h-full">
    <h2 className="font-extrabold text-5xl text-gray-600 mb-6 tracking-wider text-center animate__animated animate__fadeIn">
      My Resume
    </h2>
    <p className="text-xl text-gray-400 text-center mb-12 opacity-80">
      Start creating AI-powered resumes for your next job role.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {/* Add Resume Component */}
      <div className="transform hover:scale-60 transition-all duration-200">
        <div className="p-10 rounded-xl shadow-lg relative bg-gradient-to-br from-pink-100 to-purple-300 hover:shadow-xl hover:rotate-2">
          <AddResume />
          <p className="text-xl mt-5 text-gray-700 font-semibold text-center">Add a New Resume</p>
        </div>
      </div>

      {/* Resume Item List */}
      {resumeList.length > 0 &&
        resumeList.map((resume, index) => (
          <div
            key={index}
            className="transform hover:scale-105 hover:shadow-2xl hover:rotate-2 transition-all duration-300 p-6 rounded-xl shadow-lg bg-white hover:bg-gray-100"
          >
            <ResumeItemCart resume={resume} />
          </div>
        ))}
    </div>
  </div>
  
  );
};

export default Dashboard;
