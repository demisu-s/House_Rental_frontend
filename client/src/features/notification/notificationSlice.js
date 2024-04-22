import { createSlice } from "@reduxjs/toolkit";
import notificationService from "./notificationService"; // Changed the import name to avoid conflict

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    notificationId: "",
  },
  reducers: {
    setNotificationId: (state, action) => {
      state.notificationId = action.payload;
    },
  },
});

export const { setNotificationId } = notificationSlice.actions; 
export default notificationSlice.reducer; 
