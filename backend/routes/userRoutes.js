const express = require("express");
import {
  RegisterUser,
  LoginUser,
  logOutUser,
  forgotPassword,
  resetPassword,
  getAllUsers
} from "../controllers/userControllers";
import { isAuthUser } from "../middlewares/AuthMiddleware";


const router = express.Router();

router.route("/register").post(RegisterUser);
router.post("/login", LoginUser);
router.route("/logout").get(logOutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/").get(isAuthUser, getAllUsers);

export default router;
