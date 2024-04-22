import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestService from "./requestService";

export const createRequest = createAsyncThunk(
  'request/create',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await requestService.createRequest(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getRequest = createAsyncThunk(
  'request/getRequest',
  async (_, thunkAPI) => {
    try {
      return await requestService.getRequest();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateRequest = createAsyncThunk(
  'request/update',
  async ({ request }, thunkAPI) => {
    try {
      return await requestService.updateRequest(request.id, request);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteRequest = createAsyncThunk(
  'request/delete',
  async (id, thunkAPI) => {
    try {
      await requestService.deleteRequest(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const removeNewOrder = () => {
    // Implementation
};

export const removeOrderError = () => {
    // Implementation
};


export const requestSlice = createSlice({
  name: "request",
  initialState: {
    request: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    errorOrder:'',
    newOrder:'',
    loadingOrder:'',
    message: ""
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.order = action.payload;
      })
      .addCase(getRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.order.push(action.payload);
      })
      .addCase(createRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.order.findIndex(req => req.id === action.payload.id);
        if (index !== -1) {
          state.order[index] = action.payload;
        }
      })
      .addCase(updateRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.order = state.order.filter(req => req.id !== action.payload);
      })
      .addCase(deleteRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default requestSlice.reducer;
