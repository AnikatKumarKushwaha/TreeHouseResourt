import { configureStore } from "@reduxjs/toolkit";
import roomReducer from "./Slices/roomSlice";
import bookingReducer from "./Slices/bookingSlice";
import settingReducer from "./Slices/settingSlice";
import userReducer from "./Slices/userSlice";

export const store = configureStore({
  reducer: {
    room: roomReducer,
    booking: bookingReducer,
    setting: settingReducer,
    user: userReducer,
  },
});
