import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { Button } from '@/components/ui/button';
import { useResume } from '@/context/ResumeContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SkillForm = () => {
    const [loading, setLoading] = useState(false);
    const { resumeData, setResumeData } = useResume();
    const { resumeId } = useParams(); // Get resumeId from URL
    const userResumeId = resumeId;

    // Initialize skillList with default empty skill entry
    const [skillList, setSkillList] = useState([{ name: "", rating: 0 }]);

    // Populate skillList when resumeData.skills is available
    useEffect(() => {
        if (resumeData.skills && Array.isArray(resumeData.skills)) {
            setSkillList(resumeData.skills); // Set the existing skills in the state
        }
    }, [resumeData.skills]);  // Only run when resumeData.skills changes

    // Handle changes in skill inputs
    const handleChange = (index, name, value) => {
        const newEntries = [...skillList];
        newEntries[index][name] = value;
        setSkillList(newEntries);
    };

    // Add a new skill to the list
    const addSkill = () => {
        setSkillList([...skillList, { name: "", rating: 0 }]);
    };

    // Remove the last skill from the list
    const removeSkill = () => {
        setSkillList(skillList.slice(0, -1));
    };

    // Save the updated skills to the server
    const onSave = async () => {
        setLoading(true);
        try {
            const updatedResume = {
                ...resumeData,
                skills: skillList, // Use the current skill list for saving
            };
            await axios.put(`http://localhost:8000/api/v1/resume-update/${userResumeId}`, updatedResume);
            alert('Skills saved successfully!');
        } catch (error) {
            console.error('Error saving skills:', error);
            alert('Failed to save skills. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
            <h2 className="font-bold text-lg">Skills</h2>
            <p>Add your skills here</p>
            <div>
                {skillList.map((item, index) => (
                    <div key={index} className="flex justify-between border rounded-lg p-3 mb-2">
                        <div>
                            <label className="text-xs">Name</label>
                            <Input
                                value={item.name}
                                onChange={(e) => handleChange(index, 'name', e.target.value)}
                            />
                        </div>
                        <div className="flex items-center">
                            <label className="text-xs mr-2">Rating</label>
                            <Rating
                                style={{ maxWidth: 120 }}
                                value={item.rating}
                                onChange={(v) => handleChange(index, 'rating', v)}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-between mt-4">
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        className="text-primary"
                        onClick={addSkill}
                    >
                        + Add New Skill
                    </Button>
                    <Button
                        variant="outline"
                        className="text-primary"
                        onClick={removeSkill}
                    >
                        - Remove Skill
                    </Button>
                </div>
                <Button onClick={onSave} disabled={loading}>
                    {loading ? "Saving..." : "Save"}
                </Button>
            </div>
        </div>
    );
};

export default SkillForm;
