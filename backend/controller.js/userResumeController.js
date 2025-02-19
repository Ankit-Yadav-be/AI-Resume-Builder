import userResumeModal from "../modal/userResumeModal.js"; // Adjust the path as per your project structure

// Controller function to handle the creation of a user resume
export const userResumeController = async (req, res) => {
  try {
    // Extracting data from the request body
    const { userResumeTitle, userResumeId, userEmail, userName } = req.body;
    console.log(userResumeTitle, userResumeId, userEmail, userName);
    // Validating that all required fields are provided
    if (!userResumeTitle || !userResumeId || !userEmail || !userName) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Creating a new user resume document
    const newUserResume = new userResumeModal({
      userResumeTitle: userResumeTitle,
      userResumeId: userResumeId,
      userEmail: userEmail,
      userName: userName,
    });

    // Saving the document to the database
    await newUserResume.save();

    res.status(201).json({
      message: "User resume created successfully.",
      data: newUserResume,
    });
  } catch (error) {
    // Handling duplicate key error or other issues
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Duplicate field value detected.",
        error: error.keyValue,
      });
    }

    res.status(500).json({
      message: "An error occurred while creating the user resume.",
      error: error.message,
    });
  }
};
