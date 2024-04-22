import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

export const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      const response = await authService.register(userData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      const response = await authService.login(userData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getSingleUser = createAsyncThunk(
  'auth/getSingleUser',
  async (id, thunkAPI) => {
    try {
      const response = await authService.getSingleUser(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await authService.logout();
      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getAllUser=createAsyncThunk(
  'auth/getAllUser',
  async (userData,thunkAPI) => {
    try {
      const response = await authService.getAllUser(userData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }

)
export const editUsers=createAsyncThunk(
  'auth/editUsers',
  async (id,thunkAPI) => {
    try {
      const response = await authService.editUsers(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }

)
export const deleteUser=createAsyncThunk(
  'auth/deleteUser',
  async (id,thunkAPI) => {
    try {
      const response = await authService.deleteUser(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }

)


export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    editUser: null,
    singleUser: null,
    allUser: [],
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling register async action
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message; 
      })

       // Handling getAllUser async action
       .addCase(getAllUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allUser = action.payload; // Update with fetched users
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message; 
      })
      // Handling editUsers async action
      .addCase(editUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.editUser = action.payload; // Update with edited user
      })
      .addCase(editUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message; // Corrected error handling
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
        state.user={}
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.editUser=action.payload
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.message = action.payload;
      })

      .addCase(getSingleUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.singleUser = action.payload;
      })
      .addCase(getSingleUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.message = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.message = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = false;
        state.user = null;
      });
  }
});

export default authSlice.reducer;
