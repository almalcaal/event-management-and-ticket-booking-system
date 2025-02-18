import express from "express";
const router = express.Router();
import asyncHandler from "../middleware/asyncHandler.js";
import Activity from "../models/activity.model.js";
// import activities from "../data/activities.js";

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const activities = await Activity.find({});
    res.json(activities);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const activity = await Activity.findById(req.params.id);

    if (activity) {
      res.json(activity);
    } else {
      res.status(404);
      throw new Error("Resource not found");
    }
  })
);

export default router;
