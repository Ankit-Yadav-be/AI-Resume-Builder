import mongoose from "mongoose";

// Define the schema
const userResumeSchema = mongoose.Schema({
  userResumeTitle: {
    type: String,
    required: true,
    unique: true,
  },
  userResumeId: {
    type: String,
    unique: true,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  jobTitle: {
    type: String,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  summery: {
    type: String,
  },
  experience: [
    {
      title: { type: String },
      companyName: { type: String },
      city: { type: String },
      state: { type: String },
      startDate: { type: Date },
      endDate: { type: Date },
      workSummery: { type: String },
    },
  ],
  education: [
    {
      universityName: { type: String },
      degree: { type: String },
      major: { type: String },
      startDate: { type: Date },
      endDate: { type: Date },
      description: { type: String },
    },
  ],
  skills: [
    {
      name: {
        type: String,
      },
      rating: {
        type: Number,
      },
    },
  ],
});

// Create the model
const userResumeModal = mongoose.model("Resume", userResumeSchema);

export default userResumeModal;



