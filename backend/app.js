import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/err";

const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

import userRoutes from "./routes/userRoutes";

app.use("/api/user", userRoutes);
// middlewares for error
app.use(errorMiddleware);
export { app };
