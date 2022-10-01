import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./Slices/registerSlice";
import loginReducer from "./Slices/loginSlices";

export const store = configureStore({
  reducer: {
    signUpReducer: registerReducer,
    loginReducer,
  },
});
