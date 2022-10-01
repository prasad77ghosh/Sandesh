import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../Services/authService";

const initialState = {
  isAuthenticated: false,
  user: {},
  error: "",
};

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await login(email, password);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const loginSlice = createSlice({
  name: "Login",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state, action) => {
      state.isAuthenticated = false;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.error = "";
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    });
  },
});

export default loginSlice.reducer;
