import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSettings, updateSettings } from "../../services/apiSettings";

const initialState = {
  isLoading: false,
  data: {},
  isError: "",
};

//get settings data
export const fetchSettings = createAsyncThunk("fetchSettings", getSettings);

//update settings data
export const changeSetting = createAsyncThunk(
  "updateSettings",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await updateSettings(payload);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Cannot update data, something went wrong"
      );
    }
  }
);

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchSettings.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSettings.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchSettings.rejected, (state, action) => {
      state.isLoading = false;
      console.log("Error", action.payload);
      state.isError = true;
    });

    //update settings
    builder.addCase(changeSetting.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(changeSetting.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload[0];
      state.isError = false;
    });
    builder.addCase(changeSetting.rejected, (state, action) => {
      state.isLoading = false;
      console.log("Error", action.payload);
      state.isError = true;
    });
  },
});

export default settingSlice.reducer;
