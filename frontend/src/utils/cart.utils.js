export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  // calculate total items price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );

  // calculate the tax price which is 15% of the items price
  state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));

  // calculate the total price, total price is the sum of the items price and tax price
  state.totalPrice = (
    Number(state.itemsPrice) + Number(state.taxPrice)
  ).toFixed(2);

  // save the cart to localStorage
  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
