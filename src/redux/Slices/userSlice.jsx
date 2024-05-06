import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser } from "../../services/apiUser";

const initialState = {
  isLoading: false,
  data: [],
  isError: "",
};

//get settings data
export const fetchUser = createAsyncThunk("fetchUser", getUser);

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.isLoading = false;
      console.log("Error", action.payload);
      state.isError = true;
    });
  },
});

export default userSlice.reducer;
