import { createSlice } from "@reduxjs/toolkit";
import notification from "./notificationService";

const notification = createSlice({
  name: "notification",
  initialState: {
    notificationId: "",
  },
  reducers: {
    setNotificationId: (state, action) => {
      state.notificationId = action.payload;
      return state;
    },
  },
});
export const { setNotificationId } = notification.actions;
export default notification.reducer;