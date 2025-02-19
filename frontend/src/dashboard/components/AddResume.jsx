import React, { useState } from "react";
import { PlusSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../../components/ui/button";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddResume = () => {
  const { user } = useUser();
  const [openDialog, setOpenDialog] = useState(false);
  const userResumeId = uuidv4();
  const [userResumeTitle, setUserResumeTitle] = useState("");
  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const userName = user?.fullName;
  const navigate = useNavigate();

  const onCreate = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user-resume",
        {
          userResumeTitle,
          userResumeId,
          userEmail,
          userName,
        }
      );

      if (response.status === 201) {
        navigate("/dashboard/resume/" + userResumeId + "/edit");
        alert("Resume created successfully!");
        setOpenDialog(false);
        setUserResumeTitle("");
      }
    } catch (error) {
      console.error("Error creating resume:", error);
      alert("Failed to create resume. Please try again.");
    }
  };

  return (
    <div>
      {/* Main Wrapper with Advanced Styling */}
      <div
        className="relative p-20 py-28 border items-center flex justify-center bg-gradient-to-r from-indigo-500 to-purple-600
              rounded-3xl h-[310px] transition-all transform hover:scale-110 hover:shadow-2xl hover:cursor-pointer 
              border-dashed border-transparent shadow-lg hover:border-transparent overflow-hidden"
        onClick={() => {
          setOpenDialog(true);
        }}
      >
        {/* Icon Section with 3D Hover Effect */}
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
          <PlusSquare className="w-20 h-20 text-white transition-transform transform hover:scale-150 hover:rotate-12 duration-500 ease-in-out" />
        </div>

        {/* Animated Gradient Border */}
        <span
          className="absolute inset-0 border-2 border-transparent rounded-xl 
                bg-gradient-to-br from-blue-400 to-blue-600 opacity-40 hover:opacity-100 
                transition-opacity duration-300"
        ></span>

        {/* Inner Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-500 opacity-10 rounded-lg"></div>
      </div>

      {/* Dialog with Smooth Transition and Fancy Design */}
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-3xl font-extrabold text-gray-800">
              Create New Resume
            </DialogTitle>
            <DialogDescription>
              <p className="text-xl text-gray-600">
                Add a title for your new resume
              </p>
              <Input
                onChange={(e) => setUserResumeTitle(e.target.value)}
                placeholder="Eg. Internship resume"
                className="mt-6 my-4 border-2 border-gray-300 rounded-xl p-4 text-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
            </DialogDescription>
            <div className="flex justify-end gap-4 mt-6">
              {/* Cancel Button with Hover Animation */}
              <Button
                onClick={() => {
                  setOpenDialog(false);
                }}
                variant="ghost"
                className="text-gray-500 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              >
                Cancel
              </Button>

              {/* Create Button with Gradient Background and Hover Effects */}
              <Button
                disabled={!userResumeTitle}
                onClick={() => onCreate()}
                className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold text-lg 
                       rounded-full hover:from-green-500 hover:to-blue-600 
                       transition-all duration-300 transform hover:scale-105"
              >
                Create
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddResume;
