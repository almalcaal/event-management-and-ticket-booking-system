import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
const router = express.Router();
import {
  getActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
  createActivityReview,
} from "../controllers/activity.controller.js";

router.route("/").get(getActivities).post(protect, admin, createActivity);
router
  .route("/:id")
  .get(getActivityById)
  .put(protect, admin, updateActivity)
  .delete(protect, admin, deleteActivity);

router.route("/:id/reviews").post(protect, createActivityReview);

export default router;
