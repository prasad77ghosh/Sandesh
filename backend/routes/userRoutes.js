const express = require("express");
import {
  RegisterUser,
  LoginUser,
  logOutUser,
  forgotPassword,
  resetPassword,
} from "../controllers/userControllers";

const router = express.Router();

router.route("/register").post(RegisterUser);
router.post("/login", LoginUser);
router.route("/logout").get(logOutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

export default router;
