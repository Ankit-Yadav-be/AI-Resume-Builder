import { getResumeDataByResumeIdController } from "../controller.js/getResumeDataByResumeIdController.js";
import { resumeListController } from "../controller.js/resumeListController.js";
import { UpdateResumeController } from "../controller.js/UpdateResumeController.js";
import { userResumeController } from "../controller.js/userResumeController.js";
import express from "express";

const router = express.Router();

router.post("/user-resume", userResumeController);
router.get("/resume-list", resumeListController);
router.put("/resume-update/:userResumeId", UpdateResumeController);
router.get("/resumedata/:userResumeId", getResumeDataByResumeIdController);
export default router;
