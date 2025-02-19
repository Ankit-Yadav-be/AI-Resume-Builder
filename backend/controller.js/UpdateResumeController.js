import userResumeModal from "../modal/userResumeModal.js";

// Update Resume Controller
export const UpdateResumeController = async (req, res) => {
  const { userResumeId } = req.params; // Extract resume ID from params
  const updateFields = req.body; // Get fields to update from the request body
 // console.log(updateFields);

  try {
    // Find the resume by ID and update the fields
    const updatedResume = await userResumeModal.findOneAndUpdate(
      { userResumeId }, // Search condition
      { $set: updateFields }, // Update operation
      { new: true, runValidators: true } // Return the updated document and validate
    );

    if (!updatedResume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.status(200).json({
      message: "Resume updated successfully",
      data: updatedResume,
    });
  } catch (error) {
    console.error("Error updating resume:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
