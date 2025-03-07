import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cart.utils.js";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], address: {}, paymentMethod: "PayPal" };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // item being added to the cart
      const item = action.payload;

      // check if item exists in cart already
      const existItem = state.cartItems.find(
        (doubleCheckItem) => doubleCheckItem._id === item._id
      );

      if (existItem) {
        // update quantity
        state.cartItems = state.cartItems.map((doubleCheckItem) =>
          doubleCheckItem._id === existItem._id ? item : doubleCheckItem
        );
      } else {
        // add new item to cartItems
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      // filter out the item to remove from the cart
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);

      // update the prices and save to storage
      return updateCart(state);
    },
    saveAddress: (state, action) => {
      state.address = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCartItems: (state, action) => {
      state.cartItems = [];
      localStorage.setItem("cart", JSON.stringify(state));
    },
    resetCart: (state) => (state = initialState),
  },
});

export const {
  addToCart,
  removeFromCart,
  saveAddress,
  savePaymentMethod,
  clearCartItems,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
