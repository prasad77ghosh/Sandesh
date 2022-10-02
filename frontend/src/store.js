import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./Slices/AuthSlices/registerSlice";
import loginReducer from "./Slices/AuthSlices/loginSlices";

export const store = configureStore({
  reducer: {
    signUpReducer: registerReducer,
    loginReducer,
  },
});
