import express from "express";
import cookieParser from "cookie-parser";
<<<<<<< HEAD
import  errorMiddleware  from "./middlewares/err";
=======
import { errorMiddleware } from "./middlewares/err";
>>>>>>> 0884cfd81c3cfc3800abb18e223f563f9b598ddd

const app = express();
app.use(express.json());
app.use(cookieParser());

import userRoutes from "./routes/userRoutes";
import chatRoutes from "./routes/chatRoutes";
import messageRoutes from "./routes/messageRoutes";

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/message", messageRoutes);
// middlewares for error
app.use(errorMiddleware);
export { app };
