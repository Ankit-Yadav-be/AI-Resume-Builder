import React, { useEffect, useState } from "react";
import axios from "axios";
import FormSection from "./components/FormSection";
import ResumePreview from "./components/ResumePreview";
import { ResumeProvider } from "@/context/ResumeContext"; // Adjust the path as needed
import { useParams } from "react-router-dom";

const EditUserResume = () => {
  const { resumeId } = useParams(); // Get resumeId from URL
  const userResumeId = resumeId;
  const [resumeData, setResumeData] = useState(null); // State to store resume data
  const [loading, setLoading] = useState(true); // Loading state

  // Function to fetch resume data from the backend
  const getResumeData = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/api/v1/resumedata/${userResumeId}`);
      setResumeData(data);
      console.log(data);// Set fetched data to state
      setLoading(false);
    } catch (error) {
      console.error("Error fetching resume data:", error);
      setLoading(false);
    }
  };

  // Fetch resume data on component mount
  useEffect(() => {
    getResumeData();
  }, [resumeId]);

  // Show a loader while fetching data
  if (loading) {
    return <div>Loading...</div>;
  }

  // If no data is found, show an error message
  if (!resumeData) {
    return <div>No Resume Data Found</div>;
  }

  return (
    <ResumeProvider initialData={resumeData}>
      <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
        {/* Form Section */}
        <FormSection />
        {/* Resume Preview */}
        <ResumePreview />
      </div>
    </ResumeProvider>
  );
};

export default EditUserResume;
