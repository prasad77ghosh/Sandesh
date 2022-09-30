import app from "./app";
import dotenv from "./config/database";
import { connectDB } from "./config/database";

//handling uncought expection
process.on("uncaughtException", (error) => {
  console.log(`Error: ${error.message}`);
  console.log("Shutting down the server due to uncought exception");
  process.exit(1);
});


//config
dotenv.config({ path: "backend/config/config.env" });

connectDB();
const server = app.listen(process.env.PORT, () => {
  console.log(`Listaning on port ${process.env.PORT}`);
});

// unHandled promise rejection
process.on("uncaughtException", (error) => {
  console.log(`Error: ${error}`);
  console.log("Shutting down the server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});