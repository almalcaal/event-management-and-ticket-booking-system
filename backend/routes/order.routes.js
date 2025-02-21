import express from "express";
const orderRoutes = express.Router();
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  getOrders,
} from "../controllers/order.controller.js";
import { protect, admin } from "../middleware/authMiddleware.js";

orderRoutes
  .route("/")
  .post(protect, addOrderItems)
  .get(protect, admin, getOrders);

orderRoutes.route("/mine").get(protect, getMyOrders);
orderRoutes.route("/:id").get(protect, getOrderById);
order.Routes.route("/:id/pay").put(protect, updateOrderToPaid);

export default orderRoutes;
