import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

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

      // calculate total items price
      state.itemsPrice = addDecimals(
        state.cartItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        )
      );

      // calculate the shipping price
      // if items price is greater than 100, free shipping
      // otherwise, shipping is $10
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

      // calculate the tax price which is 15% of the items price
      state.taxPrice = addDecimals(
        Number((0.15 * state.itemsPrice).toFixed(2))
      );

      // calculate the total price, total price is the sum of the items price, shipping price and tax price
      state.totalPrice =
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice).toFixed(2);

      // save the cart to localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
