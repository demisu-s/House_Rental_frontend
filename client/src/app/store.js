import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice';
import houseReducer from '../features/house/houseSlice'
import requestReducer from '../features/request/requestSlice'
import uploadReducer from '../features/upload/uploadSlice'



export default configureStore({
  reducer: {
    auth: authReducer,
    house:houseReducer,
    request:requestReducer,
    upload:uploadReducer,
    
  },
});