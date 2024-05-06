import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteBooking,
  getBooking,
  getBookingWithoutFilter,
  getBookings,
  updateBooking,
} from "../../services/apiBookings";

const initialState = {
  isLoading: false,
  data: [],
  data2: [],
  singleData: {},
  isError: false,
};

//get booking data
export const fetchBookings = createAsyncThunk(
  "fetchbookings",
  async ({ sortValue, activeButton, from, to } = {}) => {
    const data = await getBookings(sortValue, activeButton, from, to);

    return data;
  }
);
//get booking without filter
export const fetchBookingsWithoutFliter = createAsyncThunk(
  "fetchbookingwithoutfilter",
  getBookingWithoutFilter
);
/////update
export const changeBooking = createAsyncThunk(
  "updatebooking",
  async (id, newData) => {
    const data = await updateBooking(id, newData);
    return data;
  }
);
export const removeBooking = createAsyncThunk(
  "removebookings",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await deleteBooking(payload);

      return data;
    } catch (error) {
      return rejectWithValue(error.message || "failed to delete data");
    }
  }
);

export const fetchBooking = createAsyncThunk("fetchbooking", getBooking);

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBookings.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBookings.fulfilled, (state, action) => {
      state.isLoading = false;

      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchBookings.rejected, (state, action) => {
      state.isLoading = false;
      console.log("Error", action.payload);
      state.isError = true;
    });
    //fetch booking without filter
    builder.addCase(fetchBookingsWithoutFliter.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBookingsWithoutFliter.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data2 = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchBookingsWithoutFliter.rejected, (state, action) => {
      state.isLoading = false;
      console.log("Error", action.payload);
      state.isError = true;
    });

    //single page
    builder.addCase(fetchBooking.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBooking.fulfilled, (state, action) => {
      state.isLoading = false;

      state.singleData = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchBooking.rejected, (state, action) => {
      state.isLoading = false;
      console.log("Error", action.payload);
      state.isError = true;
    });
    // update booking
    builder.addCase(changeBooking.pending, (state, action) => {
      state.isLoading = true;
      state.status = "pending";
    });
    builder.addCase(changeBooking.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;

      state.singleData = action.payload;

      state.status = "success";
    });
    builder.addCase(changeBooking.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
      state.status = "error";
      state.isLoading = false;
    });
    //delete booking

    builder.addCase(removeBooking.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(removeBooking.fulfilled, (state, action) => {
      state.isLoading = false;

      state.isError = false;
      const id = action.payload;

      if (id) {
        state.data = {
          bookings: state.data.bookings.filter((ele) => ele.id !== id),
          count: state.data.count,
        };
      }
    });
    builder.addCase(removeBooking.rejected, (state, action) => {
      console.log("Error", action.payload);

      state.isError = true;
      state.isLoading = false;
    });
  },
});

export const { emptyBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
