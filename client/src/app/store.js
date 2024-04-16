import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice';
import houseReducer from '../features/house/houseSlice'


export default configureStore({
  reducer: {
    auth: authReducer,
    house:houseReducer,
    
  },
});