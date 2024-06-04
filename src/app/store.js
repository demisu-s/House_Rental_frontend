import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice';
import roleReducer from '../features/auth/roleSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    role: roleReducer,
    
  },
});