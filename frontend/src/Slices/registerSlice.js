import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signUp } from "../Services/authService";

const initialState = {
  isAuthenticated: false,
  user: {},
  error: "",
};

export const registerUser = createAsyncThunk(
  "user/register",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const res = await signUp(name, email, password);
      return res.data;
    } catch (error) {
      console.log(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

const registerSlice = createSlice({
  name: "User",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) => {
      state.isAuthenticated = false;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.error = "";
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    });
  },
});

export default registerSlice.reducer;
