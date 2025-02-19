
import PersonalDetailResumePreview from './preview/PersonalDetailResumePreview';
import { useResume } from "@/context/ResumeContext";
import SummeryResumePreview from './preview/SummeryResumePreview';
import Professional from './preview/Professional';
import EducationalPreview from './preview/EducationalPreview';
import SkillPreview from './preview/SkillPreview';

const ResumePreview = () => {

  const { resumeData } = useResume();

  return (
    <div
  className="shadow-lg h-full p-14 border-t-[20px] rounded-xl"
  style={{ borderColor: "#ff6666" }}
>
  {/* Personal Details */}
  <div className="mb-8">
  
    <PersonalDetailResumePreview resumeData={resumeData} />
  </div>

  {/* Summary */}
  <div className="mb-8">
   
    <SummeryResumePreview resumeData={resumeData} />
  </div>

  {/* Professional Experience */}
  <div className="mb-8">
   
    <Professional resumeData={resumeData} />
  </div>

  {/* Education */}
  <div className="mb-8">
  
    <EducationalPreview resumeData={resumeData} />
  </div>

  {/* Skills */}
  <div>
  
    <SkillPreview resumeData={resumeData} />
  </div>
</div>

  )
}

export default ResumePreview