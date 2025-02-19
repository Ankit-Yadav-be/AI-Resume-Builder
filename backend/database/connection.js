import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const dbConnection = () => {
  try {
    mongoose.connect(process.env.MONGODB_URL);
    console.log("databse connection is succesfull");
  } catch (error) {
    console.log(error);
  }
};

export default dbConnection;
