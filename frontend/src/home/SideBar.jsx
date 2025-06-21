import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import {
  AiOutlineFileText,
  AiOutlineAppstoreAdd,
  AiOutlineDownload,
  AiOutlineDashboard,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false); // close drawer on mobile
  };

  return (
    <div className="md:flex h-screen w-full">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 p-6 shadow-lg text-white">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent tracking-tight">
            AI Resume Builder
          </h2>
        </div>

        <nav className="flex flex-col space-y-5 text-lg font-medium">
          {[
            { label: "Dashboard", icon: AiOutlineDashboard, path: "/dashboard" },
            { label: "Create Resume", icon: AiOutlineFileText, path: "/create-resume" },
            { label: "Choose Template", icon: AiOutlineAppstoreAdd, path: "/choose-template" },
            { label: "Download Resume", icon: AiOutlineDownload, path: "/download-resume" },
          ].map(({ label, icon: Icon, path }) => (
            <div
              key={label}
              onClick={() => handleNavigation(path)}
              className="flex items-center gap-4 p-3 rounded-md hover:bg-teal-500 transition-transform duration-200 cursor-pointer"
            >
              <Icon className="text-2xl" />
              <span>{label}</span>
            </div>
          ))}
        </nav>

        <footer className="mt-auto text-center text-sm text-gray-300 opacity-70">
          Crafted with 💻 & AI by <span className="text-white font-semibold">Ankit Yadav</span>
        </footer>
      </aside>

      {/* Topbar for Mobile */}
      <div className="md:hidden bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white p-4 flex items-center justify-between">
        <h2 className="text-xl font-extrabold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
          AI Resume Builder
        </h2>
        <Button variant="ghost" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
          {isMobileMenuOpen ? <AiOutlineClose className="text-2xl" /> : <AiOutlineMenu className="text-2xl" />}
        </Button>
      </div>

      {/* Mobile Sidebar Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 text-white shadow-xl z-50 p-6 transition-transform duration-300">
          <nav className="flex flex-col space-y-6 mt-10 text-lg font-medium">
            {[
              { label: "Dashboard", icon: AiOutlineDashboard, path: "/dashboard" },
              { label: "Create Resume", icon: AiOutlineFileText, path: "/create-resume" },
              { label: "Choose Template", icon: AiOutlineAppstoreAdd, path: "/choose-template" },
              { label: "Download Resume", icon: AiOutlineDownload, path: "/download-resume" },
            ].map(({ label, icon: Icon, path }) => (
              <div
                key={label}
                onClick={() => handleNavigation(path)}
                className="flex items-center gap-4 p-3 rounded-md hover:bg-teal-500 transition-transform duration-200 cursor-pointer"
              >
                <Icon className="text-2xl" />
                <span>{label}</span>
              </div>
            ))}
          </nav>

          <footer className="mt-20 text-center text-sm text-gray-300 opacity-70">
            Crafted with 💻 & AI by <span className="text-white font-semibold">Ankit Yadav</span>
          </footer>
        </div>
      )}
    </div>
  );
};

export default SideBar;
