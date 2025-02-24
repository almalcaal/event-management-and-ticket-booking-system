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
  getTopActivities,
} from "../controllers/activity.controller.js";

import checkObjectId from "../middleware/checkObjectId.js";

router.get("/top", getTopActivities);

router.route("/").get(getActivities).post(protect, admin, createActivity);
router
  .route("/:id")
  .get(checkObjectId, getActivityById)
  .put(protect, admin, checkObjectId, updateActivity)
  .delete(protect, admin, checkObjectId, deleteActivity);

router.route("/:id/reviews").post(protect, checkObjectId, createActivityReview);

export default router;
