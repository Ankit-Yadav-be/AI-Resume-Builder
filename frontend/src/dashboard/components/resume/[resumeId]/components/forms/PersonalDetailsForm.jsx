import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useResume } from "@/context/ResumeContext";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { LoaderCircle } from "lucide-react";

const PersonalDetailsForm = ({ enableNext }) => {
  const { resumeData, setResumeData } = useResume();
  const param = useParams();
  const userResumeId = param.resumeId;
  console.log(param);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState(resumeData || {});

  const handleInputChange = (e) => {
    enableNext(false);
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loader
    setResumeData(formData); // Update context data
    enableNext(true);

    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/resume-update/${userResumeId}`,
        formData
      );
      console.log("Resume updated:", response.data);
      enableNext(true);
    } catch (error) {
      console.error(
        "Error updating resume:",
        error.response?.data || error.message
      );
    } finally {
      // Stop loader in both success and failure cases
      setLoading(false);
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Personal Details</h2>
      <p>Get started with basic information</p>
      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label className="text-sm">First Name</label>
            <Input
              name="firstName"
              required
              defaultValue={formData.firstName || ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Last Name</label>
            <Input
              name="lastName"
              required
              defaultValue={formData.lastName || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Job Title</label>
            <Input
              name="jobTitle"
              required
              defaultValue={formData.jobTitle || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Address</label>
            <Input
              name="address"
              required
              defaultValue={formData.address || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Phone</label>
            <Input
              name="phone"
              required
              defaultValue={formData.phone || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Email</label>
            <Input
              name="email"
              required
              defaultValue={formData.email || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex mt-3 justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? (
              <div className="flex items-center gap-2">
                <LoaderCircle className="animate-spin" />
                Saving...
              </div>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetailsForm;
