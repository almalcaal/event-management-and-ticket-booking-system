import express from "express";
const router = express.Router();
import {
  getActivities,
  getActivityById,
} from "../controllers/activity.controller.js";

router.route("/").get(getActivities);
router.route("/:id").get(getActivityById);

export default router;
