import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createRoom,
  deleteRoom,
  editRoom,
  getRooms,
} from "../../services/apiRooms";

const initialState = {
  isLoading: false,
  data: [],
  isError: "",
};

//get rooms data
export const fetchRooms = createAsyncThunk("fetchRooms", getRooms);

//add room data
export const addNewRoom = createAsyncThunk(
  "addNewRoom",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await createRoom(payload);
      console.log("reached");
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "failed to add data", "slice");
    }
  }
);

//delete rooms data
export const removeRoom = createAsyncThunk(
  "removeRooms",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await deleteRoom(payload);

      return data;
    } catch (error) {
      return rejectWithValue(error.message || "failed to delete data");
    }
  }
);
//editroom
export const updateRoom = createAsyncThunk(
  "updateroom",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await editRoom(payload);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Cannot update data, something went wrong"
      );
    }
  }
);

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchRooms.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchRooms.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchRooms.rejected, (state, action) => {
      state.isLoading = false;
      console.log("Error", action.payload);
      state.isError = true;
    });

    //add rooms
    builder.addCase(addNewRoom.pending, (state, action) => {
      state.isLoading = true;
      state.isError = "";
    });
    builder.addCase(addNewRoom.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = "";

      state.data.push(action.payload[0]);
    });
    builder.addCase(addNewRoom.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = action.payload;
      state.isLoading = false;
    });

    //delete rooms

    builder.addCase(removeRoom.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(removeRoom.fulfilled, (state, action) => {
      state.isLoading = false;

      state.isError = false;
      const id = action.payload;

      if (id) {
        state.data = state.data.filter((ele) => ele.id !== id);
      }
    });
    builder.addCase(removeRoom.rejected, (state, action) => {
      console.log("Error", action.payload);

      state.isError = true;
      state.isLoading = false;
    });
    //edit rooms

    builder.addCase(updateRoom.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateRoom.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;

      state.data = state.data.map((ele) =>
        ele.id === action.payload[0].id ? { ...action.payload[0] } : ele
      );
    });
    builder.addCase(updateRoom.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;

      state.isLoading = false;
    });
  },
});

export default roomSlice.reducer;
