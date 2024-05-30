import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    setCartData: (state, action) => {
      state.data = action.payload;
      state.status = "succeeded";
    },
    setLoading: (state) => {
      state.status = "loading";
    },
    setError: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    addToCart: (state, action) => {
      const itemInCart = state.data.find(
        (item) => item.product.id === action.payload.product.id
      );

      if (itemInCart) {
        itemInCart.jumlah += 1;
        itemInCart.Total_Harga = itemInCart.jumlah * itemInCart.product.harga;
      } else {
        state.data.push(action.payload);
      }
    },
    setEditData: (state, action) => {
      state.data = action.payload;
      state.status = "succeeded";
    },
    deleteFromCart: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    editFromCart: (state, action) => {
      const index = state.data.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
  },
});

export const {
  setCartData,
  setLoading,
  setError,
  addToCart,
  setEditData,
  deleteFromCart,
  editFromCart,
} = cartSlice.actions;
export default cartSlice.reducer;
