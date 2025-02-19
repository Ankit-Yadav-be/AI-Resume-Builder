import ResumeModel from "../modal/userResumeModal.js";

// Controller to get resumes by userEmail
export const resumeListController = async (req, res) => {
  try {
    const { userEmail } = req.query; // Retrieve userEmail from query parameters
    console.log(userEmail);
    if (!userEmail) {
      return res.status(400).json({ message: "userEmail is required" });
    }

    // Query database for resumes with matching userEmail
    const resumes = await ResumeModel.find({ userEmail });

    if (resumes.length === 0) {
      return res.status(404).json({ message: "No resumes found for this email" });
    }

    // Respond with the found resumes
    res.status(200).json({ resumes });
  } catch (error) {
    console.error("Error fetching resumes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
