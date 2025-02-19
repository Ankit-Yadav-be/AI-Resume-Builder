import React from 'react'

const SummeryResumePreview = ({ resumeData }) => {
    return (
        <p className='text-xs' >
            {resumeData?.summery}
        </p>
    )
}

export default SummeryResumePreview