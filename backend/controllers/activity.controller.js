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

// @desc    Create an activity
// @route   POST /api/activities
// @access  Private/Admin
const createActivity = asyncHandler(async (req, res) => {
  const activity = new Activity({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    company: "Sample company",
    category: "Sample category",
    spotsLeft: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdActivity = await activity.save();
  res.status(201).json(createdActivity);
});

// @desc    Update an activity
// @route   PUT /api/activities/:id
// @access  Private/Admin
const updateActivity = asyncHandler(async (req, res) => {
  const { name, price, description, image, company, category, spotsLeft } =
    req.body;

  const activity = await Activity.findById(req.params.id);

  if (activity) {
    activity.name = name;
    activity.price = price;
    activity.description = description;
    activity.image = image;
    activity.company = company;
    activity.category = category;
    activity.spotsLeft = spotsLeft;

    const updatedActivity = await activity.save();
    res.json(updatedActivity);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Delete an activity
// @route   DELETE /api/activities/:id
// @access  Private/Admin
const deleteActivity = asyncHandler(async (req, res) => {
  const activity = await Activity.findById(req.params.id);

  if (activity) {
    await Activity.deleteOne({ _id: activity._id });
    res.json({ message: "Activity removed" });
  } else {
    res.status(404);
    throw new Error("Activity not found");
  }
});

export {
  getActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
};
