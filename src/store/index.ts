"use client";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import restaurantReducer from "./slices/restaurantSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // ใช้ localStorage

// รวม reducer หลายตัว
const rootReducer = combineReducers({
  auth: authReducer,
  restaurant: restaurantReducer,
});

// ตั้งค่า persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "restaurant"], // บอกว่าจะเก็บ slice ไหนบ้างใน localStorage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// สร้าง store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // แก้ warning redux-persist
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store); // ใช้คู่กับ PersistGate

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
