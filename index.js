import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connection from "./DB/db_connection.js";
import userRouter from "./src/modules/user/user.router.js";
import socketRouter from "./src/modules/socketIOUser/socket.router.js";
import notificationRouter from "./src/modules/notifications/notification.router.js";
import missingPersonRouter from "./src/modules/missingPerson/missingPerson.router.js";
import { Server as SocketIOServer } from "socket.io";
import SocketUser from "./DB/models/socketUser.js";
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises'; // Use fs/promises for async/await


// usign dotenv to load environment variables
dotenv.config();

// ----------------------------------------------------------------------------------------- //
// init express server
const app = express();
const port = 3000;
await connection();
// ----------------------------------------------------------------------------------------- //
// using cors and json middleware
app.use(express.json());
app.use(cors());
app.use("/images" , express.static("src/uploads"));
app.get('/files', async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    // Get the directory of the current file
    const __dirname = path.dirname(__filename);

    // Define the path to the images directory

    const folderPath = path.join(__dirname, 'src/uploads');
    const files = await fs.readdir(folderPath); 

    const fileCount = files.length;
    res.json({
      fileCount: fileCount,
      filenames: files
    });

  } catch (err) {
    console.error('Error reading directory:', err);
    res.status(500).send('Error reading directory');
  }
});

// ----------------------------------------------------------------------------------------- //
// init the routes
app.use("/user", userRouter);
app.use("/missingPerson", missingPersonRouter);
app.use("/socket", socketRouter);
app.use("/notification", notificationRouter);
app.use("/hello", (req, res) => {
  return res.json("Hello World");
});

// ----------------------------------------------------------------------------------------- //
// if the request is not handled by any of the above routes
app.all("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} with method ${req.method} on this server !`,
  });
});

// ----------------------------------------------------------------------------------------- //
// global error handler
app.use((err, req, res, next) => {
  if (err.message.includes("duplicate key error")) {
    err.message =
      err.message.split("{").splice(1).join("{").split("}")[0] +
      "already exists";
  }
  console.log(err);
  return res.status(err.statusCode || 500).json({
    status: "fail",
    message: err.message,
    stack: err.stack,
  });
});

// ----------------------------------------------------------------------------------------- //
//starting the server
const server = app.listen(port, async () => {
  console.log(`Server listening on port ${port}`);
});

export const io = new SocketIOServer(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  // save user's id and socket id in the database

  socket.on("disconnect", async () => {
    console.log("user disconnected", socket.id);
    await SocketUser.findOneAndUpdate(
      { socketId: socket.id },
      { isActive: false }
    );
  });
});
