import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import uploadService from "./uploadService";

export const uploadImage = createAsyncThunk(
  "upload/uploadImage",
  async (image, thunkAPI) => {
    try {
      const response = await uploadService.uploadImage(image);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const removeUploadImage = createAsyncThunk(
  "upload/removeUploadImage",
  async (id, thunkAPI) => {
    try {
      const response = await uploadService.removeUploadImage(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const removeUploadError = createAsyncThunk(
  "upload/removeUploadError",
  async (id, thunkAPI) => {
    try {
      const response = await uploadService.removeUploadError(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const uploadSlice = createSlice({
  name: "upload",
  initialState: {
    uploadedImage: "",
    loadingUploadingImage: false,
    errorImage: false,
  },
  reducers: {
    removeUploadError: (state) => {
      state.errorImage = false;
    },
    removeUploadImage: (state) => {
      state.uploadedImage = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(uploadImage.pending, (state) => {
        state.loadingUploadingImage = true;
        state.errorImage = false;
        state.uploadedImage = "";
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.loadingUploadingImage = false;
        state.uploadedImage = action.payload;
        state.errorImage = false;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.errorImage = action.payload;
        state.loadingUploadingImage = false;
        state.uploadedImage = "";
      })
      .addCase(removeUploadImage.pending, (state) => {
        state.loadingUploadingImage = true;
        state.errorImage = false;
        state.uploadedImage = "";
      })
      .addCase(removeUploadImage.fulfilled, (state, action) => {
        state.loadingUploadingImage = false;
        state.uploadedImage = action.payload;
        state.errorImage = false;
      })
      .addCase(removeUploadImage.rejected, (state, action) => {
        state.errorImage = action.payload;
        state.loadingUploadingImage = false;
        state.uploadedImage = "";
      })
      .addCase(removeUploadError.rejected, (state, action) => {
        state.errorImage = action.payload;
      });
  },
});

export default uploadSlice.reducer;
