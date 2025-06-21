import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbConnection from "./database/connection.js";
import userResumeRouter from "./route/userResumeRoutes.js";
import aiRoutes from "./route/ai.js";
import path from "path";

const app = express();
const __dirname = path.resolve();
dotenv.config();
dbConnection();

const corsOption = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      "https://ai-resume-builder-ewdh.vercel.app",
      "http://localhost:5173",
    ];

    console.log("🌍 Incoming Origin:", origin);

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error("❌ Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};


app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", userResumeRouter);
app.use("/api/ai", aiRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (_, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
