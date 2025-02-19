import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbConnection from "./database/connection.js";
import userResumeRouter from "./route/userResumeRoutes.js";
import path from "path";
const app = express();

const _dirname=path.resolve();
dotenv.config();
dbConnection();
const port = process.env.PORT || 8000;
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", userResumeRouter);

app.use(express.static(path.join(_dirname,"/frontend/dist")))
app.get('*',(_,res)=>{
  res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"));
})
app.get("/", (req, res) => {
  res.send("hello from server side");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
