import React from "react";

const PersonalDetailResumePreview = ({ resumeData }) => {
  return (
    <div>
      <h2 className="font-bold text-center" style={{ borderColor: "#ff6666" }}>
        {resumeData?.firstName} {resumeData?.lastName}
      </h2>
      <h2
        className="text-center text-sm font-medium"
        style={{ borderColor: "#ff6666" }}
      >
        {resumeData?.jobTitle}{" "}
      </h2>
      <h2 className="text-center font-normal text-xs">{resumeData?.address}</h2>

      <div className="flex justify-between">
        <h2 style={{ color: "#ff6666" }} className="font-normal text-xs ">
          {resumeData?.email}
        </h2>
        <h2 style={{ color: "#ff6666" }} className="font-normal text-xs">
          {resumeData?.phone}
        </h2>
      </div>
      <hr style={{ borderColor: "#ff6666" }} className="border-[1.5px] my-2" />
    </div>
  );
};

export default PersonalDetailResumePreview;
