import mongoose from "mongoose";

const socketUser = new mongoose.Schema({
  socketId: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  isActive: {
    type: Boolean,
    default: true,
  },
});

const SocketUser = mongoose.model("SocketUser", socketUser);
export default SocketUser;
