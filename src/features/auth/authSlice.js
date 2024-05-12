import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

export const register=createAsyncThunk(
    'auth/register',
    async(user,thunkAPI)=>{
        try{
        return await authService.register(user)
        }catch(error){
const message=error.message 
return thunkAPI.rejectWithValue(message)
        }
    }
)

export const login=createAsyncThunk(
    'auth/login',
    async(user,thunkAPI)=>{
        try{
        return await authService.login(user)
        }catch(error){
const message=error.message
return thunkAPI.rejectWithValue(message)
        }
    }
)

export const logout=createAsyncThunk(
    'auth/logout',
    async()=>{
     await authService.logout()
    }
)



//slice hold initial state,reducer,action

export const authSlice=createSlice({
    name:"auth",
    initialState:{
        user:null,
        isError:false,
        isSuccess:false,
        isLoading:false,
        message:""
    },
    reducers:{},
    extraReducers:(builder)=>{
       builder
       .addCase(register.pending,(state)=>{
        state.isLoading=true
       })
       .addCase(register.fulfilled,(state,action)=>{
        state.isLoading=false
        state.isSuccess=true
        state.user=action.payload
       })
       .addCase(register.rejected,(state,action)=>{
        state.isLoading=false
        state.isError=true
        state.user=null
        state.message=action.payload
       })

       .addCase(login.pending,(state)=>{
        state.isLoading=true
       })
       .addCase(login.fulfilled,(state,action)=>{
        state.isLoading=false
        state.isSuccess=true
        state.user=action.payload
       })
       .addCase(login.rejected,(state,action)=>{
        state.isLoading=false
        state.isError=true
        state.user=null
        state.message=action.payload
       })
       .addCase(logout.fulfilled,(state,action)=>{
        state.isLoading=false
        state.isSuccess=false
        state.isError=false
        state.user=null
       })

    }
})

export default authSlice.reducer