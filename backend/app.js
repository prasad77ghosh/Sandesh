import express from "express";
import cookieParser from "cookie-parser";


import  errorMiddleware  from "./middlewares/err";


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
