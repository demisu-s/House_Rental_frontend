import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import houseService from "./houseService";

export const createHouse = createAsyncThunk(
  'house/create',
  async (house, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await houseService.createHouse(house, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getHouse = createAsyncThunk(
  'house/getHouse',
  async (_, thunkAPI) => {
    try {
      return await houseService.getHouse();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateHouse = createAsyncThunk(
  'house/update',
  async ({ id, house }, thunkAPI) => {
    try {
      return await houseService.updateHouse(id, house);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removeNewHouse = createAsyncThunk(
  'house/removeNewHouse', 
  async ({ newHouse }, thunkAPI) => {
    
    return null; 
  }
);

export const deleteHouse = createAsyncThunk(
  'house/delete',
  async (id, thunkAPI) => {
    try {
      await houseService.deleteHouse(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const houseSlice = createSlice({
  name: "house",
  initialState: {
    list: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHouse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getHouse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.list = action.payload;
      })
      .addCase(getHouse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createHouse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createHouse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.list.push(action.payload);
      })
      .addCase(createHouse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateHouse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateHouse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.list.findIndex(house => house.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateHouse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteHouse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteHouse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.list = state.list.filter(house => house.id !== action.payload);
      })
      .addCase(deleteHouse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default houseSlice.reducer;
