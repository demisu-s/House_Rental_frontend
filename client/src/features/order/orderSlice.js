import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createOrderApi, getAllOrderApi, editOrderApi, deleteOrderApi } from "./orderService";

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (order, thunkAPI) => {
    try {
      const response = await createOrderApi(order);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getAllOrder = createAsyncThunk(
  "order/getAllOrder",
  async (_, thunkAPI) => {
    try {
      const response = await getAllOrderApi();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const editOrder = createAsyncThunk(
  "order/editOrder",
  async ({ id, newOrder }, thunkAPI) => {
    try {
      const response = await editOrderApi({ id, newOrder });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (id, thunkAPI) => {
    try {
      const response = await deleteOrderApi(id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    Order: {},
    newOrder: null,
    allOrder: [],
    loadingOrder: false,
    errorOrder: false,
  },
  reducers: {
    removeOrderError: (state) => {
      state.errorOrder = false;
    },
    removeNewOrder: (state) => {
      state.newOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loadingOrder = true;
        state.errorOrder = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loadingOrder = false;
        state.newOrder = action.payload;
        state.errorOrder = false;
      })
      .addCase(createOrder.rejected, (state) => {
        state.errorOrder = true;
        state.loadingOrder = false;
        state.newOrder = null;
      })
      .addCase(getAllOrder.pending, (state) => {
        state.errorOrder = false;
        state.allOrder = [];
        state.loadingOrder = true;
      })
      .addCase(getAllOrder.fulfilled, (state, action) => {
        state.errorOrder = false;
        state.allOrder = action.payload;
        state.loadingOrder = false;
      })
      .addCase(getAllOrder.rejected, (state) => {
        state.errorOrder = true;
        state.allOrder = [];
        state.loadingOrder = false;
      })
      .addCase(editOrder.pending, (state) => {
        state.loadingOrder = true;
        state.errorOrder = false;
        state.Order = {};
      })
      .addCase(editOrder.fulfilled, (state, action) => {
        state.loadingOrder = false;
        state.errorOrder = false;
        state.Order = action.payload;
      })
      .addCase(editOrder.rejected, (state) => {
        state.loadingOrder = false;
        state.errorOrder = true;
        state.Order = {};
      })
      .addCase(deleteOrder.pending, (state) => {
        state.loadingOrder = true;
        state.errorOrder = false;
        state.Order = {};
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loadingOrder = false;
        state.errorOrder = false;
        state.Order = action.payload;
      })
      .addCase(deleteOrder.rejected, (state) => {
        state.loadingOrder = false;
        state.Order = {};
        state.errorOrder = true;
      });
  },
});

export const {
  removeOrderError,
  removeNewOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
