import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connection from "./DB/db_connection.js";
import userRouter from "./src/modules/user/user.router.js";
import missingPersonRouter from "./src/modules/missingPerson/missingPerson.router.js";
// usign dotenv to load environment variables
dotenv.config();

// ----------------------------------------------------------------------------------------- //
// init express server
const app = express();
const port = 3000;
await connection();
// ----------------------------------------------------------------------------------------- //
// using cors and json middleware
app.use(cors());
app.use(express.json());

// ----------------------------------------------------------------------------------------- //
// init the routes
app.use("/user", userRouter);
app.use("/missingPerson", missingPersonRouter);
app.use("/hello", (req, res) => {
  return res.json("Hello World");
});

// ----------------------------------------------------------------------------------------- //
// if the request is not handled by any of the above routes
app.all("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server !`,
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
  return res.status(err.statusCode || 500).json({
    status: "fail",
    message: err.message,
    stack: err.stack,
  });
});

// ----------------------------------------------------------------------------------------- //
//starting the server
app.listen(port, async () => {
  console.log(`Server listening on port ${port}`);
});
