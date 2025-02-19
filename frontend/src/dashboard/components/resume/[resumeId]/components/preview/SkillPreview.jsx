import React from 'react';

const SkillPreview = ({ resumeData }) => {
    return (
        <div className="my-6">
            <h2
                className="text-center font-bold text-sm mb-2"
                style={{ color: "#ff6666" }}
            >
                Skills
            </h2>
            <hr style={{ borderColor: "#ff6666"  }} />
            {resumeData && resumeData.skills?.length > 0 ? (
                <div className="grid grid-cols-2 gap-3 my-4">
                    {resumeData.skills.map((skill, index) => (
                        <div key={index} className="items-center flex justify-between">
                            <h2 className="text-xs">{skill.name}</h2>
                            <div className="h-2 bg-gray-200 w-[120px]">
                                <div
                                    className="h-2"
                                    style={{
                                        backgroundColor: resumeData?.themeColor,
                                        width: skill.rating + '%',
                                    }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">No skills available</p>
            )}
        </div>
    );
};

export default SkillPreview;
