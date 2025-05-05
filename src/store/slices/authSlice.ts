"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  user: {
    email: string;
    id: string;
  } | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        token: string;
        user: { email: string; id: string };
      }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    setUser: (
      state,
      action: PayloadAction<{
        token: string;
        user: { email: string; id: string };
      }>
    ) => {
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setCredentials, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
