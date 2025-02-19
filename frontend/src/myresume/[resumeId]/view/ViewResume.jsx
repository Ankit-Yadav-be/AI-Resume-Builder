import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { ResumeProvider } from "@/context/ResumeContext";
import ResumePreview from "@/dashboard/components/resume/[resumeId]/components/ResumePreview";
import { RWebShare } from "react-web-share";

const ViewResume = () => {
  const param = useParams();
  const userResumeId = param?.resumeId;
  const [resumeData, setResumeData] = useState(null);

  // Fetch resume data from the server
  const getResumeData = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/resumedata/${userResumeId}`
      );
      setResumeData(data); // Set the fetched resume data
    } catch (error) {
      console.error("Error fetching resume data:", error);
    }
  };

  useEffect(() => {
    getResumeData();
  }, [userResumeId]);

  // Log resumeData to ensure it's updated
  useEffect(() => {
    if (resumeData) {
      console.log("Updated resume data:", resumeData);
    }
  }, [resumeData]);

  if (!resumeData) {
    return <div>Loading...</div>; // Show loading if no data yet
  }


  const handleDownload = () => {
    window.print();
  }

  return (
    <ResumeProvider initialData={resumeData}>
    <div>
  <div id="no-print">
    <Header />

    <div className="my-10 mx-10 md:mx-20 lg:mx-36 p-6 bg-gradient-to-r from-blue-50 to-indigo-100 rounded-xl shadow-lg">
      <h2 className="text-center text-3xl font-extrabold text-gray-800 mb-4 tracking-wide">
        Congrats! Your AI-generated resume is ready.
      </h2>
      <p className="text-center text-lg text-gray-500 mb-6">
        Now you are ready to download your resume and also you can share a unique resume URL with your friends and family.
      </p>

      <div className="flex justify-between px-24 my-10">
        {/* Download Button */}
        <Button
          onClick={handleDownload}
          className="transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:bg-teal-700 shadow-md rounded-lg px-6 py-3"
        >
          Download
        </Button>

        {/* Share Button */}
        <RWebShare
          data={{
            text: "Hello everyone, this is my resume and please open to click on URL.",
            url: `${import.meta.env.VITE_BASE_URL}/myresume/${userResumeId}/view`,
            title: `${resumeData?.firstName} ${resumeData?.lastName}'s Resume`,
          }}
          onClick={() => console.log("Shared successfully!")}
        >
          <Button
            className="transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:bg-purple-700 shadow-md rounded-lg px-6 py-3"
          >
            Share
          </Button>
        </RWebShare>
      </div>
    </div>
  </div>

  <div
    id="print-area"
    className="my-10 mx-10 md:mx-20 lg:mx-36 p-6 bg-white rounded-xl shadow-xl"
  >
    {/* Ensure ResumePreview uses context data */}
    <ResumePreview />
  </div>
</div>

    </ResumeProvider>
  );
};

export default ViewResume;
