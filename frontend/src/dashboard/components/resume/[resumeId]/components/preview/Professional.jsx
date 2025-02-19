import React from 'react'

const Professional = ({ resumeData }) => {
    return (
        <div className='my-6'>
            <h2
                className='text-center font-bold text-sm mb-2'
                style={{ color: "#ff6666" }}
            >professional experiances</h2>
            <hr style={{ borderColor:"#ff6666" }} />
            {resumeData&&resumeData.experience.map((experience, index) => (
                <div key={index} className='my-5'>
                    <h2
                    style={{ color: "#ff6666" }}
                    className='text-sm font-bold' >{experience.title}</h2>
                    <h2 className='text-xs flex justify-between'>{experience.companyName},{experience.city},{experience.state}
                        <span>{experience.startDate} {experience.currentlyWorking ? 'present' : experience.endDate}</span>


                    </h2>
                    {/* <p className='text-xs my-2'>
                        {experience?.workSummery}
                    </p> */}
                    <div dangerouslySetInnerHTML={{__html:experience?.workSummery}}>
                        
                        </div>
                </div>
            ))}
        </div>
    )
}

export default Professional