// store/slices/restaurantSlice.ts
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  restaurantId: null,
  restaurantName: null,
  restaurantPhone: null,
};

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    setSelectedRestaurant(state, action) {
      state.restaurantId = action.payload.id;
      state.restaurantName = action.payload.name;
      state.restaurantPhone = action.payload.phone;
    },
    clearSelectedRestaurant(state) {
      state.restaurantId = null;
      state.restaurantName = null;
      state.restaurantPhone = null;
    },
  },
});

export const { setSelectedRestaurant, clearSelectedRestaurant } =
  restaurantSlice.actions;

export default restaurantSlice.reducer;
