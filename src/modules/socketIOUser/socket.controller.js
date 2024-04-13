import SocketUser from "../../../DB/models/socketUser.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const checkUserSocket = asyncHandler(async (req, res, next) => {
  // check if the person is already exists or not by checking the model for the same person
  console.log(req.user.id);
  const userSocket = await SocketUser.findOne({ userId: req.user.id });
  if (userSocket) {
    // userSocket.isActive = true;
    userSocket.socketId = req.body.socketId;
    await userSocket.save();
    return res.status(200).json({
      success: true,
      message: "socket updated",
    });
  }

  const newUser = await SocketUser.create({
    socketId: req.body.socketId,
    userId: req.user.id,
  });
  return res.status(201).json({
    success: true,
    message: "socket added",
  });
});
