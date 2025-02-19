import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import RichTextEditor from "../RichTextEditor";
import { useResume } from "@/context/ResumeContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

const ExperieanceForm = ({ enableNext }) => {
    const formField = {
        title: "",
        companyName: "",
        city: "",
        state: "",
        startDate: "",
        endDate: "",
        workSummery: "",
    };

    const [experianceList, setExperianceList] = useState([formField]);
    const { resumeData, setResumeData } = useResume();
    const param = useParams();
    const userResumeId = param.resumeId;
    const [loading, setLoading] = useState(false);
    const [alertData, setAlertData] = useState({ type: "", message: "" });

    // Use effect to load initial experience data if it exists
    // useEffect(() => {
    //     if (resumeData?.experience && resumeData.experience.length > 0) {
    //         setExperianceList(resumeData.experience);
    //     }
    // }, [resumeData]);

    const handleChange = (index, e) => {
        const newEntries = experianceList.slice();
        const { name, value } = e.target;
        newEntries[index][name] = value;
        setExperianceList(newEntries);
    };

    const addExperiance = () => setExperianceList([...experianceList, formField]);

    const removeExperiance = () => setExperianceList((experianceList) => experianceList.slice(0, -1));

    const handleRichTextEditor = (e, name, index) => {
        const newEntries = experianceList.slice();
        newEntries[index][name] = e.target.value;
        setExperianceList(newEntries);
    };

    useEffect(() => {
        setResumeData({
            ...resumeData,
            experience: experianceList,
        });
    }, [experianceList]);

    const onSave = async () => {
        setLoading(true);
        try {
            const response = await axios.put(
                `https://ai-resume-builder-7yb4.onrender.com/api/v1/resume-update/${userResumeId}`,
                { experience: experianceList }
            );
            setAlertData({ type: "success", message: "Experience saved successfully!" });
            console.log(response.data);
        } catch (error) {
            setAlertData({ type: "error", message: "Failed to save experience. Please try again." });
            console.error("Error saving experience:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
                <h2 className="font-bold text-lg">Professional Experiences</h2>
                <p>Add your previous job experience</p>

                {alertData.message && (
                    <Alert className={`mt-5 ${alertData.type === "success" ? "bg-green-300" : "bg-red-300"}`} status={alertData.type}>
                        <Terminal className="h-4 w-4" />
                        <AlertTitle>{alertData.type === "success" ? "Success!" : "Error!"}</AlertTitle>
                        <AlertDescription>{alertData.message}</AlertDescription>
                    </Alert>
                )}

                <div>
                    {experianceList.map((items, index) => (
                        <div key={index}>
                            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                                <div>
                                    <label className="text-xs">Position Title</label>
                                    <Input
                                        name="title"
                                        value={items.title}
                                        onChange={(e) => handleChange(index, e)}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs">Company Name</label>
                                    <Input
                                        name="companyName"
                                        value={items.companyName}
                                        onChange={(e) => handleChange(index, e)}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs">City</label>
                                    <Input
                                        name="city"
                                        value={items.city}
                                        onChange={(e) => handleChange(index, e)}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs">State</label>
                                    <Input
                                        name="state"
                                        value={items.state}
                                        onChange={(e) => handleChange(index, e)}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs">Start Date</label>
                                    <Input
                                        type="date"
                                        name="startDate"
                                       
                                        onChange={(e) => handleChange(index, e)}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs">End Date</label>
                                    <Input
                                        type="date"
                                        name="endDate"
                                       
                                        onChange={(e) => handleChange(index, e)}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <RichTextEditor
                                        index={index}
                                        value={items.workSummery}
                                        onRichTextEditorChange={(e) =>
                                            handleRichTextEditor(e, "workSummery", index)
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-between">
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            className="text-primary"
                            onClick={addExperiance}
                        >
                            + Add More Experiences
                        </Button>
                        <Button
                            variant="outline"
                            className="text-primary"
                            onClick={removeExperiance}
                        >
                            - Remove
                        </Button>
                    </div>
                    <Button onClick={onSave} disabled={loading}>
                        {loading ? "Saving..." : "Save"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ExperieanceForm;
