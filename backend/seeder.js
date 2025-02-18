import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import activities from "./data/activities.js";
import users from "./data/users.js";
import Activity from "./models/activity.model.js";
import User from "./models/user.model.js";
import Order from "./models/order.model.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Activity.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleActivities = activities.map((activity) => {
      return { ...activity, user: adminUser };
    });

    await Activity.insertMany(sampleActivities);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Activity.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
