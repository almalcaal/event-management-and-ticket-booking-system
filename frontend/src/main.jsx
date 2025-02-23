import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store.js";
import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeScreen from "./screens/Home.screen.jsx";
import ActivityScreen from "./screens/Activity.screen.jsx";
import CartScreen from "./screens/Cart.screen.jsx";
import LoginScreen from "./screens/Login.screen.jsx";
import RegisterScreen from "./screens/Register.screen.jsx";
import AddressScreen from "./screens/Address.screen.jsx";
import PaymentScreen from "./screens/Payment.screen.jsx";
import PlaceOrderScreen from "./screens/PlaceOrder.screen.jsx";
import OrderScreen from "./screens/Order.screen.jsx";
import ProfileScreen from "./screens/Profile.screen.jsx";
import OrderListScreen from "./screens/OrderList.screen.jsx";
import ActivityListScreen from "./screens/ActivityList.screen.jsx";
import ActivityEditScreen from "./screens/admin/ActivityEdit.screen.jsx";
import UserListScreen from "./screens/admin/UserList.screen.jsx";

import PrivateRoute from "./components/common/PrivateRoute.component.jsx";
import AdminRoute from "./components/common/AdminRoute.component.jsx";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/activities/:id" element={<ActivityScreen />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/address" element={<AddressScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
        <Route path="/order/:id" element={<OrderScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>

      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/orderlist" element={<OrderListScreen />} />
        <Route path="/admin/activitylist" element={<ActivityListScreen />} />
        <Route
          path="/admin/activity/:id/edit"
          element={<ActivityEditScreen />}
        />
        <Route path="/admin/userlist" element={<UserListScreen />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </StrictMode>
);
