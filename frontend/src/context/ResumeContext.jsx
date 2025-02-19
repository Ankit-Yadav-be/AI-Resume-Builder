import React, { createContext, useContext, useState } from 'react';

// Create Context
const ResumeContext = createContext();

// Custom Hook to use ResumeContext
export const useResume = () => {
    const context = useContext(ResumeContext);
    if (!context) {
        throw new Error('useResume must be used within a ResumeProvider');
    }
    return context;
};

// ResumeProvider Component
export const ResumeProvider = ({ children, initialData }) => {
    // State to hold resume data
    const [resumeData, setResumeData] = useState(initialData);

    // Context Value
    const value = {
        resumeData,
        setResumeData, // Allow updates to the resume data
    };

    return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>;
};
