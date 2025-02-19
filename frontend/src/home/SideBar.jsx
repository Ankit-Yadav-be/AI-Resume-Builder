import { Button } from '@/components/ui/button';
import React from 'react';
import { AiOutlineFileText, AiOutlineAppstoreAdd, AiOutlineDownload, AiOutlineDashboard } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="flex h-screen bg-gradient-to-r from-indigo-800 via-purple-800 to-pink-800 text-white">
            {/* Sidebar */}
            <div className="w-64 bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 p-8 shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-105">
                <div className="mb-16 text-center">
                    <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 tracking-tight animate__animated animate__fadeIn">
                        AI Resume Builder
                    </h2>
                </div>

                {/* Sidebar Links */}
                <div className="space-y-6">
                    <div onClick={() => handleNavigation("/dashboard")} className="flex items-center space-x-4 hover:bg-teal-500 p-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
                        <AiOutlineDashboard className="text-3xl text-white" />
                        <span className="text-xl font-semibold">Dashboard</span>
                    </div>

                    <div onClick={() => handleNavigation("/create-resume")} className="flex items-center space-x-4 hover:bg-teal-500 p-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
                        <AiOutlineFileText className="text-3xl text-white" />
                        <span className="text-xl font-semibold">Create Resume</span>
                    </div>

                    <div onClick={() => handleNavigation("/choose-template")} className="flex items-center space-x-4 hover:bg-teal-500 p-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
                        <AiOutlineAppstoreAdd className="text-3xl text-white" />
                        <span className="text-xl font-semibold">Choose Template</span>
                    </div>

                    <div onClick={() => handleNavigation("/download-resume")} className="flex items-center space-x-4 hover:bg-teal-500 p-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
                        <AiOutlineDownload className="text-3xl text-white" />
                        <span className="text-xl font-semibold">Download Resume</span>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-32 text-center">
                    <p className="text-sm text-gray-300 opacity-70 hover:opacity-100 transition-opacity duration-300">
                        Crafted with 💻 and AI by [Ankit Yadav]
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-12 space-y-8">
                {/* Content here like the one you mentioned earlier */}
            </div>
        </div>
    );
};

export default SideBar;
