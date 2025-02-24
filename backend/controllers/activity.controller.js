import asyncHandler from "../middleware/asyncHandler.js";
import Activity from "../models/activity.model.js";

// @desc        Fetch all activities
// @route       GET /api/activities
// @access      Public
const getActivities = asyncHandler(async (req, res) => {
  const pageSize = 4;
  const page = Number(req.query.pageNumber) || 1;

  const count = await Activity.countDocuments();
  const activities = await Activity.find()
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ activities, page, pages: Math.ceil(count / pageSize) });
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

// @desc    Create new review
// @route   POST /api/activities/:id/reviews
// @access  Private
const createActivityReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const activity = await Activity.findById(req.params.id);

  if (activity) {
    const alreadyReviewed = activity.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Activity already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    activity.reviews.push(review);

    activity.numReviews = activity.reviews.length;

    activity.rating =
      activity.reviews.reduce((acc, item) => item.rating + acc, 0) /
      activity.reviews.length;

    await activity.save();
    res.status(201).json({ message: "Review added" });
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
  createActivityReview,
};
