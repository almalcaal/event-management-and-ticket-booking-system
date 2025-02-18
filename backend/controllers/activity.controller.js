import asyncHandler from "../middleware/asyncHandler.js";
import Activity from "../models/activity.model.js";

// @desc        Fetch all activities
// @route       GET /api/activities
// @access      Public
const getActivities = asyncHandler(async (req, res) => {
  const activities = await Activity.find({});
  res.json(activities);
});

// @desc        Fetch single activity
// @route       GET /api/activities/:id
// @access      Public
const getActivityById = asyncHandler(async (req, res) => {
  const activity = await Activity.findById(req.params.id);

  if (activity) {
    res.json(activity);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

export { getActivities, getActivityById };
