import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useResume } from "@/context/ResumeContext";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

const EducationForm = () => {
    const { resumeData, setResumeData } = useResume();
    const { resumeId } = useParams(); // Get resumeId from URL
    const userResumeId = resumeId;
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null); // Alert state
    const [educationalList, setEducationalList] = useState([{
        universityName: "",
        degree: "",
        major: "",
        startDate: "",
        endDate: "",
        description: "",
    }]);

    // Update educationalList when resumeData changes
    useEffect(() => {
        if (resumeData?.education && Array.isArray(resumeData.education)) {
            setEducationalList(resumeData.education); // Pre-fill the form with existing education data
        }
    }, [resumeData?.education]);

    const handleOnChange = (event, index) => {
        const newEntries = educationalList.slice();
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setEducationalList(newEntries);
    };

    const addEducation = () => {
        setEducationalList([
            ...educationalList,
            {
                universityName: "",
                degree: "",
                major: "",
                startDate: "",
                endDate: "",
                description: "",
            },
        ]);
    };

    const removeEducation = () => {
        setEducationalList((educationalList) => educationalList.slice(0, -1));
    };

    const onSave = async () => {
        setLoading(true);
        try {
            // Prepare the payload with education details
            const payload = {
                education: educationalList,
            };

            // Make API call to update resume
            const response = await axios.put(
                `https://ai-resume-builder-7yb4.onrender.com/api/v1/resume-update/${userResumeId}`,
                payload
            );

            if (response.status === 200) {
                setResumeData((prevData) => ({
                    ...prevData,
                    education: educationalList,
                }));
                setAlert({ type: "success", message: "Education details saved successfully!" });
            }
        } catch (error) {
            console.error("Error saving education details:", error);
            setAlert({ type: "error", message: "Failed to save education details." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
            <h2 className="font-bold text-lg">Education</h2>
            <p>Add your educational details</p>
            {alert && (
                <Alert className={`mt-5 ${alert.type === "success" ? "bg-green-300" : "bg-red-300"}`}>
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>{alert.type === "success" ? "Success!" : "Error!"}</AlertTitle>
                    <AlertDescription>{alert.message}</AlertDescription>
                </Alert>
            )}
            <div>
                {educationalList.map((item, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg"
                    >
                        <div>
                            <label>University Name</label>
                            <Input
                                name="universityName"
                                value={item.universityName}
                                onChange={(event) => handleOnChange(event, index)}
                            />
                        </div>
                        <div>
                            <label>Degree</label>
                            <Input
                                name="degree"
                                value={item.degree}
                                onChange={(event) => handleOnChange(event, index)}
                            />
                        </div>
                        <div>
                            <label>Major</label>
                            <Input
                                name="major"
                                value={item.major}
                                onChange={(event) => handleOnChange(event, index)}
                            />
                        </div>
                        <div>
                            <label>Start Date</label>
                            <Input
                                name="startDate"
                                type="date"
                                value={item.startDate || ""}
                                onChange={(event) => handleOnChange(event, index)}
                            />
                        </div>
                        <div>
                            <label>End Date</label>
                            <Input
                                name="endDate"
                                type="date"
                                value={item.endDate || ""}
                                onChange={(event) => handleOnChange(event, index)}
                            />
                        </div>
                        <div>
                            <label>Description</label>
                            <Textarea
                                name="description"
                                value={item.description}
                                onChange={(event) => handleOnChange(event, index)}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-between">
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        className="text-primary"
                        onClick={addEducation}
                    >
                        + Add New Education
                    </Button>
                    <Button
                        variant="outline"
                        className="text-primary"
                        onClick={removeEducation}
                    >
                        - Remove
                    </Button>
                </div>
                <Button onClick={onSave} disabled={loading}>
                    {loading ? "Saving..." : "Save"}
                </Button>
            </div>
        </div>
    );
};

export default EducationForm;
