
import userResumeModal from "../modal/userResumeModal.js";

export const getResumeDataByResumeIdController = async (req, res) => {
    try {
      const { userResumeId } = req.params;
      console.log(userResumeId);
      // Find the resume by userResumeId
      const resume = await userResumeModal.findOne({ userResumeId });
  
      if (!resume) {
        return res.status(404).json({ message: "Resume not found" });
      }
  
      // Send the resume data as a response
      res.status(200).json(resume);
    } catch (error) {
      // Handle errors
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  };