import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import activities from "./data/activities.js";

const PORT = process.env.PORT || 5000;
connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/api/activities", (req, res) => {
  res.json(activities);
});

app.get("/api/activities/:id", (req, res) => {
  const activity = activities.find(
    (activity) => activity._id === Number(req.params.id)
  );
  res.json(activity);
});

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
